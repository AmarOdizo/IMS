"use client";

import { useState } from "react";
import StaffSidebar from "@/components/staff/StaffSidebar";
import StaffHeader from "@/components/staff/StaffHeader";

export default function StaffLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col font-sans">
      {/* Staff Responsive Sidebar */}
      <StaffSidebar
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Container */}
      <div className="pl-0 lg:pl-64 flex flex-col flex-1 transition-all">
        {/* Fixed Header */}
        <StaffHeader
          isMobileNavOpen={isMobileNavOpen}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        />

        {/* Content Area with 80% Desktop Zoom Wrapper */}
        <main className="w-full pt-16 flex-1 bg-background min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <div className="w-full staff-zoom-wrapper portal-zoom-wrapper lg:[zoom:80%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
