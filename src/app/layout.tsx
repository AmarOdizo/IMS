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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface font-body text-on-surface antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
