"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import type { Pool } from "@/types/pool"
import { createOrder } from "@/service/api"
import { useLanguage } from "@/hooks/use-language"

interface OrderModalProps {
  pool: Pool
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ pool, isOpen, onClose }: OrderModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    quantity: 1,
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createOrder({
        poolId: pool.id,
        ...formData,
      })
      setSubmitSuccess(true)
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
        setFormData({
          customerName: "",
          customerPhone: "",
          customerAddress: "",
          quantity: 1,
          notes: "",
        })
      }, 2000)
    } catch (error) {
      console.error("Order submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number.parseInt(value) || 1 : value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{t("orderPool")}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-semibold">{pool.name}</h3>
            <p className="text-gray-600">
              {pool.size} • {pool.tall}
            </p>
            <p className="text-lg font-bold text-primary-teal">
              {new Intl.NumberFormat("ru-RU").format(pool.price)} {t("sum")}
            </p>
          </div>

          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-lg font-semibold mb-2">✅ {t("orderSuccess")}</div>
              <p className="text-gray-600">{t("orderSuccessMessage")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("customerName")} *</label>
                <Input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  placeholder={t("enterName")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("customerPhone")} *</label>
                <Input
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("customerAddress")} *</label>
                <Input
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  required
                  placeholder={t("enterAddress")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("quantity")}</label>
                <Input
                  name="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("notes")}</label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={t("additionalNotes")}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-teal hover:bg-primary-teal-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("submitting") : t("submitOrder")}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
