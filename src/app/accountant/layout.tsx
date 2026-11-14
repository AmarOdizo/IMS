import AccountantSidebar from "@/components/accountant/AccountantSidebar";
import AccountantHeader from "@/components/accountant/AccountantHeader";

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col font-sans">
      {/* Accountant Fixed Sidebar */}
      <AccountantSidebar />

      {/* Main Container */}
      <div className="pl-64 flex flex-col flex-1">
        {/* Fixed Header */}
        <AccountantHeader />

        {/* Content Area */}
        <main className="pt-16 flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
