"use client"

import { Check } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function AboutSection() {
  const { t } = useLanguage()

  const features = [t("durability"), t("easyInstallation"), t("beautifulColors"), t("stylishDesign"), t("highQuality")]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary-teal mb-12">{t("intexPoolsInTashkent")}</h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <p className="text-gray-600 mb-6 leading-relaxed">{t("aboutIntexPools")}</p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-gray-600 leading-relaxed">{t("poolBenefits")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
