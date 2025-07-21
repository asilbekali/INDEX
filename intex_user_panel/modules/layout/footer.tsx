"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, MessageCircle, Instagram, CheckCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function Footer() {
  const { t } = useLanguage()
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setConsultationForm({ name: "", phone: "" })
      setShowSuccessModal(true)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setConsultationForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <footer className="bg-primary-teal text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{t("freeConsultationTitle")}</h3>
            <form onSubmit={handleConsultationSubmit} className="space-y-3">
              <Input
                name="name"
                type="text"
                placeholder={t("enterNamePlaceholder")}
                value={consultationForm.name}
                onChange={handleInputChange}
                className="bg-white text-black placeholder-gray-500"
                required
              />
              <Input
                name="phone"
                type="tel"
                placeholder={t("enterPhonePlaceholder")}
                value={consultationForm.phone}
                onChange={handleInputChange}
                className="bg-white text-black placeholder-gray-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-yellow-accent text-black hover:bg-yellow-500 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("submitting") : t("getConsultation")}
              </Button>
            </form>
          </div>

          <div className="text-center">
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
                <MessageCircle className="w-6 h-6" />
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

          <div>
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

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-lg overflow-hidden">
          <DialogHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <DialogTitle className="text-2xl font-bold">{t("consultationSuccessTitle")}</DialogTitle>
            <DialogDescription className="text-gray-600">{t("consultationSuccessMessage")}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center pt-4">
            <Button onClick={() => setShowSuccessModal(false)} className="bg-green-500 hover:bg-green-600">
              {t("ok")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
