"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Phone, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const name = (
      target.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const phone = (
      target.elements.namedItem("phone") as HTMLInputElement
    ).value.trim();

    if (!name || !phone) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://18.184.169.185/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", phone: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitSuccess(false);
      setFormData({ name: "", phone: "" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white sm:max-w-[425px] p-6 rounded-lg">
        {!submitSuccess ? (
          <>
            <DialogHeader className="text-center" style={{ color: "#009398" }}>
              <DialogTitle className="text-2xl font-bold">
                Konsultatsiya uchun bog'lanish
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Iltimos, quyidagi formani to‘ldiring
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2"
                  style={{ color: "#009398" }}
                >
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
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-2"
                  style={{ color: "#009398" }}
                >
                  <Phone className="w-4 h-4" />
                  Telefon
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <DialogFooter className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.name.trim() ||
                    !formData.phone.trim()
                  }
                  style={{ backgroundColor: "#009398", color: "white" }}
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
              <DialogTitle className="text-2xl font-bold text-green-600">
                Muvaffaqiyatli yuborildi!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Tez orada siz bilan bog'lanamiz
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center py-4">
              <div className="w-8 h-1 bg-green-500 rounded-full animate-pulse" />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
