import "./globals.css";
import type { Metadata } from "next";
import ApolloWrapper from "@/lib/ApolloWrapper";

export const metadata: Metadata = {
  title: "Onboarding Platform",
  description: "Welcome to our Onboarding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
