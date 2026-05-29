import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://refinance-calculator.vercel.app"),
  title: {
    default: "Refinance Calculator - Estimate Your Mortgage Savings",
    template: "%s | Refinance Calculator"
  },
  description:
    "Use this mortgage refinance calculator to estimate monthly payments, interest savings, closing costs, and your refinance break-even point.",
  applicationName: "Refinance Calculator",
  keywords: [
    "refinance calculator",
    "mortgage refinance calculator",
    "refinance savings calculator",
    "refinance payment calculator"
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Refinance Calculator - Estimate Your Mortgage Savings",
    description:
      "Calculate monthly payments, interest savings, and break-even timelines for refinancing your mortgage.",
    siteName: "Refinance Calculator"
  },
  twitter: {
    card: "summary_large_image",
    title: "Refinance Calculator - Estimate Your Mortgage Savings",
    description:
      "Calculate monthly payments, interest savings, and break-even timelines for refinancing your mortgage."
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
