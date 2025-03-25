import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Platform - List of Prospects",
  description: "Manage your prospects",
};

export default function ApplyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
