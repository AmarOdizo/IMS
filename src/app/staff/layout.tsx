import StaffSidebar from "@/components/staff/StaffSidebar";
import StaffHeader from "@/components/staff/StaffHeader";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col">
      {/* Staff Fixed Sidebar */}
      <StaffSidebar />

      {/* Main App Container */}
      <div className="pl-64 flex flex-col flex-1">
        {/* Fixed Header */}
        <StaffHeader />

        {/* Content Area */}
        <main className="pt-16 flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
