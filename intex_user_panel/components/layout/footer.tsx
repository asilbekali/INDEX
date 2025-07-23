"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Send, Instagram } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import ConsultationModal from "@/components/pools/consultation-modal" 

export default function Footer() {
  const { t } = useLanguage()
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  const handleOpenConsultationModal = () => {
    setIsConsultationModalOpen(true)
  }

  const handleCloseConsultationModal = () => {
    setIsConsultationModalOpen(false)
  }

  return (
    <footer className="bg-primary-teal text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-bold mb-4">{t("freeConsultationTitle")}</h3>

            <div className="space-y-3">
              <Input
                name="name"
                type="text"
                placeholder={t("enterNamePlaceholder")}
                className="bg-white text-black placeholder-gray-500"
                required
              />
              <Input
                name="phone"
                type="tel"
                placeholder={t("enterPhonePlaceholder")}
                className="bg-white text-black placeholder-gray-500"
                required
              />
              <Button
                type="button" 
                className="w-full bg-yellow-accent text-black hover:bg-yellow-500 font-semibold"
                onClick={handleOpenConsultationModal}
              >
                {t("getConsultation")}
              </Button>
            </div>
          </div>

          <div className="text-center w-full md:w-1/3">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">{t("workingHours")}</h3>
            </div>
            <div className="space-y-2 mb-4">
              <p>{t("workingHoursSchedule")}: 10:00 - 22:00</p>
              <p>{t("dailyWork")}</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://t.me/intexmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <Send className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/intexmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-bold mb-4">intex-market.uz</h3>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">+998 99 911 02 04</p>
              <p>{t("addressTitle")}:</p>
              <p>{t("fullAddress")}</p>
              <div className="mt-4">
                <p className="text-xs">{t("foundationSupport")}</p>
                <p className="text-xs">{t("supportDescription")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 INTEX-MARKET.UZ. {t("allRightsReserved")}</p>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={handleCloseConsultationModal}
      />
    </footer>
  )
}
