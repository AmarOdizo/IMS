"use client";

import { useState } from "react";
import AccountantSidebar from "@/components/accountant/AccountantSidebar";
import AccountantHeader from "@/components/accountant/AccountantHeader";

export default function AccountantLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col font-sans">
      {/* Accountant Responsive Sidebar */}
      <AccountantSidebar
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Container */}
      <div className="pl-0 lg:pl-64 flex flex-col flex-1 transition-all">
        {/* Fixed Header */}
        <AccountantHeader
          isMobileNavOpen={isMobileNavOpen}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        />

        {/* Content Area with 80% Desktop Zoom Wrapper */}
        <main className="w-full pt-16 flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <div className="w-full accountant-zoom-wrapper portal-zoom-wrapper lg:[zoom:80%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
