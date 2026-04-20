import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { MobileMenuProvider } from "@/contexts/mobile-menu-context"
import { MobileMenu } from "@/components/mobile-menu"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dazur - Market Value & Capital Advisory",
  description:
    "Align your business with investor knowledge market timings",
  keywords: [
    "market value",
    "capital advisory",
    "business optimization",
    "stakeholders",
    "EBITDA",
    "private equity",
    "M&A",
    "business valuation",
  ],
  authors: [{ name: "Dazur Capital" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Dazur Capital - Market Value Optimization & Capital Advisory",
    description:
      "Transform your business through strategic capital advisory and comprehensive value optimization across Commercial, Intangible, Physical, People, and Financial pillars.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dazur Capital - Globalizing Companies that investors can't ignore",
      },
    ],
    type: "website",
    siteName: "Dazur Capital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dazur Capital - Market Value Optimization & Capital Advisory",
    description: "Transform your business through strategic capital advisory and comprehensive value optimization.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <MobileMenuProvider>
            <MobileMenu />
            {children}
          </MobileMenuProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
