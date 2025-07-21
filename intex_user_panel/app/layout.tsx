import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "INTEX-MARKET.UZ - Бассейны в Ташкенте",
  description: "Каркасные и надувные бассейны INTEX в Ташкенте. Бесплатная доставка, гарантия качества.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
