import type { Metadata } from "next";
import StudentSidebar from "@/components/student/StudentSidebar";
import StudentHeader from "@/components/student/StudentHeader";

export const metadata: Metadata = {
  title: "Student Dashboard - Academic Portal",
  description: "Apex IMS Enrolled Student Learning & Academic Desk",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col">
      {/* Student Fixed Sidebar */}
      <StudentSidebar />

      {/* Main App Container */}
      <div className="pl-64 flex flex-col flex-1">
        {/* Fixed Header */}
        <StudentHeader />

        {/* Content Area */}
        <main className="pt-16 flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
