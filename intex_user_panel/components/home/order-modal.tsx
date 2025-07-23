"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState<"form" | "success">("form")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      setStep("success")
      console.log("Order submitted:", formData)
    }
  }

  const handleClose = () => {
    setStep("form")
    setFormData({ name: "", phone: "" })
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-0 shadow-xl overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute right-9 top-9 z-10 rounded-full p-1 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className=" h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {step === "form" ? (
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-orange-200 opacity-20 animate-pulse"></div>
                </div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 mx-auto shadow-lg">
                  <img
                    src="/images/ConsultationImage.png"
                    alt="Consultation avatar"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">{t("getConsultationn")}</DialogTitle>
              <p className="text-sm text-gray-600 mb-6">Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz</p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="sr-only">
                  {t("yourName")}
                </Label>
                <Input
                  id="name"
                  placeholder={t("yourName")}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-orange-400 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="sr-only">
                  {t("yourPhone")}
                </Label>
                <Input
                  id="phone"
                  placeholder={t("yourPhone")}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-orange-400 transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                {t("orderr")}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg text-center">
            <DialogHeader className="text-center mb-4">
              <DialogTitle className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {t("thanks")}
              </DialogTitle>
            </DialogHeader>

            <div className="mx-auto mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-green-200 opacity-20 animate-ping"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-green-300 opacity-30 animate-pulse"></div>
              </div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-500 mx-auto shadow-xl">
                <Check className="h-8 w-8 text-white stroke-[3] drop-shadow-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 font-medium text-lg">Buyurtmangiz qabul qilindi!</p>
              <p className="text-sm text-gray-600 leading-relaxed px-2">{t("orderSuccess")}</p>
            </div>

            <div className="mt-6 flex justify-center space-x-1">
              <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              <div className="h-1 w-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></div>
              <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
