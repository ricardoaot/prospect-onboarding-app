import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Platform - List of Prospects",
  description: "Manage your prospects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
