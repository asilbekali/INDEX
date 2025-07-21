"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Phone, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Bu muhim!
    e.stopPropagation() // Bu ham qo'shdik

    // Validate form
    if (!formData.name.trim() || !formData.phone.trim()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form
      setFormData({ name: "", phone: "" })

      // Close modal after 2 seconds of showing success
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
      }, 2000)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      // Reset states when modal closes
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({ name: "", phone: "" })
      }, 300)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg">
        {!submitSuccess ? (
          // Form State
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">Konsultatsiya so'rash</DialogTitle>
              <DialogDescription className="text-gray-600">Konsultatsiya uchun formani to'ldiring</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Ism
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ismingizni kiriting"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefon
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Telefon raqamingizni kiriting"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <DialogFooter className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Yuborilmoqda...
                    </div>
                  ) : (
                    "Yuborish"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <DialogTitle className="text-2xl font-bold text-green-600">Muvaffaqiyatli yuborildi!</DialogTitle>
              <DialogDescription className="text-gray-600">Tez orada siz bilan bog'lanamiz</DialogDescription>
            </DialogHeader>

            <div className="flex justify-center py-4">
              <div className="w-8 h-1 bg-green-500 rounded-full animate-pulse" />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
