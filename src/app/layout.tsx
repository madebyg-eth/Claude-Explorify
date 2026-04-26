import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explorify – Buy & Sell Businesses",
  description: "The premier marketplace to buy and sell businesses. Secure escrow, transparent financials, and verified listings.",
  keywords: ["buy business", "sell business", "business marketplace", "M&A", "acquisitions"],
  openGraph: {
    title: "Explorify – Buy & Sell Businesses",
    description: "The premier marketplace to buy and sell businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
