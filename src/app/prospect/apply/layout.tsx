import "../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Platform",
  description: "Welcome to our Onboarding Platform",
};

export default function ApplyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
