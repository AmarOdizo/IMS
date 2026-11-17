"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />
      <div className="pl-0 lg:pl-64 transition-all">
        <AdminHeader
          isMobileNavOpen={isMobileNavOpen}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        />
        <main className="w-full pt-16 bg-surface min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <div className="w-full admin-zoom-wrapper portal-zoom-wrapper lg:[zoom:80%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
