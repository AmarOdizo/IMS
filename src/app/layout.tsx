import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Apex Institute Management System (IMS)",
    template: "%s | Apex IMS",
  },
  description: "Official Campus ERP & Institutional Management System • Apex Institute of Technology & Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface font-body text-on-surface antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
