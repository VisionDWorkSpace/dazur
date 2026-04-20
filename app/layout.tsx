import type React from "react"
import type { Metadata } from "next"
import { Inter, Source_Serif_4 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Submissão de Oportunidades | Private Investment Banking",
  description:
    "Submeta a sua oportunidade de venda de negócios ou ativos. Mediação profissional para transações ≥ 1.000.000 €.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.NodeNode
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
