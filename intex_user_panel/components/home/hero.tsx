"use client"

import Image from "next/image"
import { useLanguage } from "@/hooks/use-language"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white">
      <div className="relative">
        <Image
          src="/images/hero-pool.png"
          alt="INTEX Easy Set Pool - Family enjoying pool time"
          width={1200}
          height={600}
          className="w-full h-auto"
          priority
        />

        <div className="bg-primary-teal text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">{t("seasonalSale")}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
