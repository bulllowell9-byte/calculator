import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { siteConfig } from "@/lib/site";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Refinance Calculator - Estimate Mortgage Savings | RefiWise",
    template: "%s | RefiWise"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "refinance calculator",
    "mortgage refinance calculator",
    "refinance savings calculator",
    "refinance payment calculator",
    "mortgage calculator",
    "amortization schedule",
    "break-even refinance calculator"
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Refinance Calculator - Estimate Mortgage Savings | RefiWise",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Refinance Calculator - Estimate Mortgage Savings | RefiWise",
    description: siteConfig.description
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3566093762013563"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
