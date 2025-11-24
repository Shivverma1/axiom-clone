import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pulse Interface",
  description: "Real-time token tracking and market pulse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
