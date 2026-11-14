import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Role Access Portal",
  description: "Secure login to Apex Institute Management System",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
