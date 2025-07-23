"use client"

import { useLanguage } from "@/hooks/use-language"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage("ru")}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          language === "ru" ? "bg-white text-primary-teal" : "bg-transparent text-white hover:bg-white/20"
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLanguage("uz")}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          language === "uz" ? "bg-white text-primary-teal" : "bg-transparent text-white hover:bg-white/20"
        }`}
      >
        UZ
      </button>
    </div>
  )
}
