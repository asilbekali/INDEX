"use client"
import { Users, Truck, Award } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function ValuesSection() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Users,
      title: t("experience"),
      description: t("experienceDesc"),
    },
    {
      icon: Truck,
      title: t("delivery"),
      description: t("deliveryDesc"),
    },
    {
      icon: Award,
      title: t("quality"),
      description: t("qualityDesc"),
    },
  ]

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary-teal mb-12">{t("ourClientValues")}</h2>

        <div className="flex flex-col md:flex-row md:justify-around md:items-start gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center w-full md:w-1/3">
              <value.icon className="feature-icon text-primary-teal" />
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
