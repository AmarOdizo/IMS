import type { Metadata } from "next";
import StudentLayoutClient from "@/components/student/StudentLayoutClient";

export const metadata: Metadata = {
  title: "Student Dashboard - Academic Portal",
  description: "Apex IMS Enrolled Student Learning & Academic Desk",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentLayoutClient>{children}</StudentLayoutClient>;
}
