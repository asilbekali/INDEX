"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, CheckCircle } from "lucide-react"
import type { Pool } from "@/types/pool"
import { createOrder } from "@/service/api"
import { useLanguage } from "@/hooks/use-language"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

interface OrderModalProps {
  pool: Pool
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ pool, isOpen, onClose }: OrderModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userLocation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createOrder({
        productId: pool.id,
        userName: formData.userName,
        userPhone: formData.userPhone,
        userLocation: formData.userLocation,
      })
      setSubmitSuccess(true)
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
        setFormData({
          userName: "",
          userPhone: "",
          userLocation: "",
        })
      }, 2000)
    } catch (error) {
      console.error("Order submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageError = () => {
    setImageError(true)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[600px] rounded-lg overflow-hidden p-0">
        {submitSuccess ? (
          <div className="text-center py-12 px-6">
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping-slow opacity-75" />
              <div className="relative bg-green-500 rounded-full w-20 h-20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <DialogTitle className="text-3xl font-bold mb-2">{t("orderSuccess")}</DialogTitle>
            <DialogDescription className="text-gray-600">{t("orderSuccessMessage")}</DialogDescription>
          </div>
        ) : (
          <>
            <div className="text-center my-4">
              <DialogTitle className="text-2xl font-semibold">{t("orderNow")}</DialogTitle>
              <DialogDescription className="text-gray-600">
                {t("orderFormDescription")}
              </DialogDescription>
            </div>

            <div className="p-6 pt-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold mb-2 text-primary-teal">{pool.name}</h3>
                  <Image
                    src={imageError ? "/placeholder.svg?height=200&width=300&query=intex pool" : pool.image}
                    alt={pool.name}
                    width={300}
                    height={200}
                    className="w-full h-auto object-contain rounded-md mb-4"
                    onError={handleImageError}
                  />
                  <div className="text-sm text-gray-600 mb-2">
                    <p>{t("size")}: {pool.size} см</p>
                    <p>{t("height")}: {pool.tall} см</p>
                  </div>
                  <p className="text-2xl font-bold text-primary-teal">
                    {new Intl.NumberFormat("ru-RU").format(pool.price)} {t("sum")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="md:w-1/2 flex flex-col justify-center space-y-4">
                  <Input
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    placeholder={t("enterName")}
                  />
                  <Input
                    name="userPhone"
                    type="tel"
                    value={formData.userPhone}
                    onChange={handleInputChange}
                    required
                    placeholder={t("enterPhonePlaceholder")}
                  />
                  <div className="relative">
                    <Input
                      name="userLocation"
                      value={formData.userLocation}
                      onChange={handleInputChange}
                      required
                      placeholder={t("enterAddress")}
                      className="pr-10"
                    />
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-yellow-accent text-black hover:bg-yellow-500 font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("submitting") : t("submitOrder")}
                  </Button>
                </form>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
