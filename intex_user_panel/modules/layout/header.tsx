"use client"

import Link from "next/link"
import { Phone, MessageCircle, Instagram } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/hooks/use-language"

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="bg-primary-teal text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            INTEX-MARKET.UZ
          </Link>

          <nav className="flex items-center space-x-8">
            <Link href="/karkasli-bassein" className="hover:text-gray-200 transition-colors font-medium text-white">
              {t("framePoolsNav")}
            </Link>
            <Link href="/naduvniy-bassein" className="hover:text-gray-200 transition-colors font-medium text-white">
              {t("inflatablePoolsNav")}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">(99) 911 02 04</span>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://t.me/intexmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/intexmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
