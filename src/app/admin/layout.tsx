import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard - Central Command Matrix",
  description: "Apex IMS Central Administrative Governance & Operations",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="w-full pt-16 bg-surface min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
