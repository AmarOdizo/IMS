import type { Metadata } from "next";
import StaffLayoutClient from "@/components/staff/StaffLayoutClient";

export const metadata: Metadata = {
  title: "Staff Dashboard - Faculty Instruction Portal",
  description: "Apex IMS Faculty & Teacher Academic Instruction Workspace",
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffLayoutClient>{children}</StaffLayoutClient>;
}
