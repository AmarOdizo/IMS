import type { Metadata } from "next";
import AccountantLayoutClient from "@/components/accountant/AccountantLayoutClient";

export const metadata: Metadata = {
  title: "Accountant Dashboard - Treasury & Collections",
  description: "Apex IMS Financial Operations, Fee Receipts & Cash Counter",
};

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountantLayoutClient>{children}</AccountantLayoutClient>;
}
