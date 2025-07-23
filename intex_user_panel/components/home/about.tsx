"use client"

import { Check } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function AboutSection() {
  const { t } = useLanguage()

  const benefits = [
    t("benefit_durability"),
    t("benefit_easy_install"),
    t("benefit_bright_colors"),
    t("benefit_modern_design"),
    t("benefit_high_quality"),
  ]

  return (
    <section className="py-8 bg-gray-50">
      <div className="w-full">
        <div className="bg-teal-500 text-white text-center py-4 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <h1 className="text-xl font-semibold">{t("header_title")}</h1>
        </div>

        <div className="bg-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-between border-l border-r border-b border-gray-300">
          <div className="flex-1 p-8 border-r border-gray-300">
            <p className="text-sm leading-relaxed text-gray-800">{t("main_description")}</p>
          </div>

          <div className="flex-1 p-8">
            <p className="text-sm text-gray-800 mb-4">{t("advantages_intro")}</p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
