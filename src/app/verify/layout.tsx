import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credential Verification - Public Trust Hub",
  description: "Official verification of student certificates, transcripts, and ID cards",
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
