"use client";

import { useState } from "react";
import StudentSidebar from "@/components/student/StudentSidebar";
import StudentHeader from "@/components/student/StudentHeader";

export default function StudentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col font-sans">
      {/* Student Responsive Sidebar */}
      <StudentSidebar
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Container */}
      <div className="pl-0 lg:pl-64 flex flex-col flex-1 transition-all">
        {/* Fixed Header */}
        <StudentHeader
          isMobileNavOpen={isMobileNavOpen}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        />

        {/* Content Area with 80% Desktop Zoom Wrapper */}
        <main className="w-full pt-16 flex-1 bg-background min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <div className="w-full student-zoom-wrapper portal-zoom-wrapper lg:[zoom:80%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
