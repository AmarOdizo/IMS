import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduAdmin ERP | Apex Institute of Technology & Management",
  description: "Institutional Command & Management System",
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

