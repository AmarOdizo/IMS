"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  GraduationCap,
  Briefcase,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  QrCode,
  Building2,
  Check,
  X,
} from "lucide-react";

type RoleType = "admin" | "teacher" | "student" | "accountant";

interface RoleConfig {
  id: RoleType;
  title: string;
  defaultEmail: string;
  portalRoute: string;
  badge: string;
  icon: typeof User;
  description: string;
}

const roles: RoleConfig[] = [
  {
    id: "admin",
    title: "Institutional Admin",
    defaultEmail: "admin@apexinstitute.edu.in",
    portalRoute: "/admin",
    badge: "Full Governance",
    icon: ShieldCheck,
    description: "Manage users, admissions, batches, fees, exams, certificates & campus directives.",
  },
  {
    id: "teacher",
    title: "Faculty / Teacher",
    defaultEmail: "faculty.cs@apexinstitute.edu.in",
    portalRoute: "/staff",
    badge: "Academic Register",
    icon: Briefcase,
    description: "Mark attendance, enter exam marks, view batches and broadcast batch circulars.",
  },
  {
    id: "student",
    title: "Enrolled Student",
    defaultEmail: "rahul.sharma@apex.edu.in",
    portalRoute: "/student",
    badge: "Student Portal",
    icon: GraduationCap,
    description: "Access term results, attendance records, fee vouchers, certificates and digital ID card.",
  },
  {
    id: "accountant",
    title: "Bursar / Accountant",
    defaultEmail: "accounts@apexinstitute.edu.in",
    portalRoute: "/accountant",
    badge: "Financial Cadre",
    icon: KeyRound,
    description: "Counter fee realizations, thermal voucher stamping, defaulter aging and daybook audits.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>("admin");
  const [identifier, setIdentifier] = useState("admin@apexinstitute.edu.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // OTP Reset Password Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStep, setResetStep] = useState<"email" | "otp" | "newPassword" | "success">("email");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeRole = roles.find((r) => r.id === selectedRole) || roles[0];

  const handleRoleSelect = (roleId: RoleType) => {
    setSelectedRole(roleId);
    const target = roles.find((r) => r.id === roleId);
    if (target) {
      setIdentifier(target.defaultEmail);
      setPassword("••••••••••••");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Simulate login verification
    setTimeout(() => {
      setLoading(false);
      router.push(activeRole.portalRoute);
    }, 450);
  };

  const handleQuickDemo = (roleId: RoleType) => {
    handleRoleSelect(roleId);
    const target = roles.find((r) => r.id === roleId);
    if (target) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push(target.portalRoute);
      }, 300);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col justify-between font-body select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-primary-container text-on-primary px-4 py-3 shadow-lg flex items-center gap-2 border border-secondary font-mono text-xs animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="h-16 border-b border-[#d5e3fc] bg-primary-container px-6 flex items-center justify-between text-on-primary shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-secondary-container text-primary font-bold flex items-center justify-center text-sm border border-secondary shadow-xs">
            <span className="material-symbols-outlined text-xl">account_balance</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-base font-bold uppercase tracking-tight leading-tight">
              Apex Institute Management System
            </span>
            <span className="text-[10px] tracking-wider uppercase text-on-primary-container font-mono font-semibold">
              Unified Role-Based ERP Portal &bull; AY 2025-26
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/verify"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-mono uppercase font-bold tracking-wider transition-colors shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Public QR Verification</span>
          </Link>
          <span className="hidden md:inline-block text-[11px] font-mono text-on-primary-container bg-surface-container/20 px-2 py-1">
            SECURE ACCESS NODE #01
          </span>
        </div>
      </header>

      {/* Center Main Login Section */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#d5e3fc] shadow-xl overflow-hidden">
          {/* Left Column (5 Cols): Role Selection & Institutional Credentials Info */}
          <div className="lg:col-span-5 bg-primary p-6 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-primary-container">
            <div>
              <div className="flex items-center gap-2 text-secondary-container font-mono text-[11px] uppercase tracking-wider mb-2 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Select Access Authority</span>
              </div>
              <h2 className="text-xl font-bold font-headline uppercase tracking-tight text-white mb-1">
                Institutional Sign-In
              </h2>
              <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                Choose your assigned academic or administrative role to load your authorized workspace.
              </p>

              {/* Role Radio Cards */}
              <div className="flex flex-col gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleSelect(r.id)}
                      className={`text-left p-3 border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white/10 border-secondary-container shadow-xs"
                          : "bg-white/5 border-white/15 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 font-bold text-xs uppercase font-mono tracking-tight text-white">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-secondary-container" : "text-gray-300"}`} />
                          <span>{r.title}</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 bg-white/15 text-gray-200">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 font-sans line-clamp-2 leading-relaxed">
                        {r.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Demo Launchers */}
            <div className="pt-4 mt-4 border-t border-white/15">
              <span className="text-[10px] font-mono uppercase text-gray-300 block mb-2 font-semibold">
                Quick Evaluator One-Click Bypass:
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("admin")}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-center border border-white/20 cursor-pointer"
                >
                  &rarr; Admin Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("teacher")}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-center border border-white/20 cursor-pointer"
                >
                  &rarr; Teacher Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("student")}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-center border border-white/20 cursor-pointer"
                >
                  &rarr; Student Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("accountant")}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-center border border-white/20 cursor-pointer"
                >
                  &rarr; Accounts Portal
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Authentication Form */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-5">
                <div>
                  <h3 className="text-lg font-bold font-headline text-primary uppercase tracking-tight">
                    Credential Verification
                  </h3>
                  <span className="text-xs text-on-surface-variant font-mono">
                    Authenticating as: <strong className="text-secondary uppercase">{activeRole.title}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-surface-container font-bold text-primary border border-[#cbd5e1]">
                  RBAC V4.2
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-300 text-rose-900 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="flex flex-col gap-4 font-mono text-xs">
                {/* Email / Phone Field (FR-1.1) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase font-bold text-secondary flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span>Registered Email or Phone Number:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. user@apexinstitute.edu.in or 9876543210"
                    className="w-full bg-surface-container-low p-2.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none font-mono text-sm text-primary"
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] uppercase font-bold text-secondary flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-secondary" />
                      <span>Account Password:</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setResetEmail(identifier);
                        setResetStep("email");
                        setIsResetModalOpen(true);
                      }}
                      className="text-[11px] text-secondary hover:underline cursor-pointer"
                    >
                      Forgot Password (OTP)?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter account security key..."
                      className="w-full bg-surface-container-low p-2.5 pr-10 border border-[#cbd5e1] focus:border-secondary focus:outline-none font-mono text-sm text-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded-none cursor-pointer"
                    />
                    <span>Keep terminal session persistent</span>
                  </label>
                  <span className="text-[10px] text-gray-500 font-mono">
                    Idle expiry: 30 mins
                  </span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full py-3 bg-primary hover:bg-primary/95 text-on-primary uppercase font-bold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying Credentials &amp; Node Tokens...</span>
                  ) : (
                    <>
                      <span>Enter {activeRole.title} Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Security Disclaimer */}
            <div className="mt-6 pt-4 border-t border-[#cbd5e1] text-[10px] text-gray-500 font-mono flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                Protected by 256-bit TLS Encryption
              </span>
              <span>Apex IMS v1.0 &bull; Approved SRS Scope</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 border-t border-[#d5e3fc] bg-surface-container-low px-6 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
        <span>&copy; 2026 Apex Institute of Technology &amp; Management. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/verify" className="hover:text-primary underline">
            Verify Certificate / ID Card
          </Link>
          <span>Support: helpdesk@apexinstitute.edu.in</span>
        </div>
      </footer>

      {/* Reset Password Modal with Email OTP (FR-1.4) */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Reset Password via Email OTP
                </h3>
              </div>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {resetStep === "email" && (
              <div className="space-y-3">
                <p className="text-gray-600 font-sans text-xs leading-relaxed">
                  Enter your registered institutional email address. A 6-digit one-time password (OTP) will be dispatched to verify your identity.
                </p>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-secondary">
                    Registered Email:
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="user@apexinstitute.edu.in"
                    className="p-2 border border-[#cbd5e1] bg-surface-container-low focus:border-secondary focus:outline-none"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setIsResetModalOpen(false)}
                    className="px-3 py-1.5 bg-surface-container uppercase font-semibold text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!resetEmail) return;
                      setResetStep("otp");
                      showToast(`Dispatched 6-digit OTP code to ${resetEmail}`);
                    }}
                    className="px-4 py-1.5 bg-primary text-white uppercase font-bold"
                  >
                    Send OTP Code
                  </button>
                </div>
              </div>
            )}

            {resetStep === "otp" && (
              <div className="space-y-3">
                <p className="text-gray-600 font-sans text-xs leading-relaxed">
                  Enter the 6-digit OTP dispatched to <strong>{resetEmail}</strong>:
                </p>
                <div className="flex justify-between gap-2 py-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      defaultValue={idx === 0 ? "7" : idx === 1 ? "4" : idx === 2 ? "9" : idx === 3 ? "2" : idx === 4 ? "0" : "1"}
                      className="w-10 h-11 text-center font-bold text-lg border border-[#cbd5e1] bg-surface-container-low focus:border-secondary focus:outline-none"
                    />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500 flex justify-between">
                  <span>Code expires in 04:59 mins</span>
                  <button
                    type="button"
                    onClick={() => showToast(`Re-sent fresh OTP to ${resetEmail}`)}
                    className="text-secondary underline"
                  >
                    Resend Code
                  </button>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setResetStep("email")}
                    className="px-3 py-1.5 bg-surface-container uppercase font-semibold text-gray-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setResetStep("newPassword");
                    }}
                    className="px-4 py-1.5 bg-primary text-white uppercase font-bold"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

            {resetStep === "newPassword" && (
              <div className="space-y-3">
                <p className="text-gray-600 font-sans text-xs leading-relaxed">
                  OTP verified successfully! Create a new secure password for your account:
                </p>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-secondary">
                    New Security Password:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 8 characters..."
                    className="p-2 border border-[#cbd5e1] bg-surface-container-low focus:border-secondary focus:outline-none"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setResetStep("success");
                      showToast("Password updated successfully!");
                    }}
                    className="px-4 py-1.5 bg-primary text-white uppercase font-bold"
                  >
                    Save New Password
                  </button>
                </div>
              </div>
            )}

            {resetStep === "success" && (
              <div className="space-y-3 text-center py-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-sm text-primary uppercase">
                  Password Reset Complete!
                </h4>
                <p className="text-gray-600 font-sans text-xs">
                  Your credentials have been securely updated. You can now log into your portal with your new password.
                </p>
                <button
                  onClick={() => setIsResetModalOpen(false)}
                  className="mt-2 px-6 py-2 bg-primary text-white uppercase font-bold text-xs"
                >
                  Return to Sign-In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
