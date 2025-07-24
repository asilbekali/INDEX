"use client"

import Link from "next/link"
import { Phone, Send, Instagram } from "lucide-react"
import LanguageSwitcher from "./language"
import { useLanguage } from "@/hooks/use-language"
import { usePathname } from "next/navigation"

export default function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <header className="fixed  top-0 left-0 w-full z-50 bg-primary-teal text-white shadow-md">
      <div className=" mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            INTEX-MARKET.UZ
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/karkasli-bassein"
              className={`hover:text-gray-300 transition-colors font-medium ${pathname === "/karkasli-bassein" ? "border-b-2 border-white" : "text-white"
                }`}
            >
              {t("framePoolsNav")}
            </Link>

            <Link
              href="/naduvniy-bassein"
              className={`hover:text-gray-300 transition-colors font-medium ${pathname === "/naduvniy-bassein" ? "border-b-2 border-white" : "text-white"
                }`}
            >
              {t("inflatablePoolsNav")}
            </Link>

          </nav>

          <div className="flex items-center space-x-4">
            <a href="tel:+998999110204" className="flex items-center space-x-2 hover:underline">
              <div className="bg-white rounded-md p-2 shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Phone className="w-4 h-4 text-primary-teal" />
              </div>
              <span className="font-semibold">(99) 911 02 04</span>
            </a>

            <a
              href="https://t.me/intexmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-md p-2 shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Send className="w-4 h-4 text-primary-teal" />
            </a>
            <a
              href="https://instagram.com/intexmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-md p-2 shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Instagram className="w-4 h-4 text-primary-teal" />
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
