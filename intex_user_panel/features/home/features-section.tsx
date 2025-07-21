"use client"

import { Truck, Gift, Shield } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Truck,
      title: t("freeDelivery"),
      description: t("freeDeliveryDesc"),
      number: "1",
    },
    {
      icon: Gift,
      title: t("specialChemistry"),
      description: t("specialChemistryDesc"),
      number: "2",
    },
    {
      icon: Shield,
      title: t("qualityGuarantee"),
      description: t("qualityGuaranteeDesc"),
      number: "3",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary-teal text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {feature.number}
              </div>
              <feature.icon className="feature-icon text-primary-teal" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
