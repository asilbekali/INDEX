"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import OrderModal from "./order-modal"

export default function FreeDeliverySection() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOrderClick = () => {
    setIsModalOpen(true)
  }


  return (
    <>
      <section className="bg-primary-teal text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("freeDelivery")}</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">{t("freeDeliveryFullDesc")}</p>
          <Button
            onClick={handleOrderClick}
            className="bg-yellow-accent text-black hover:bg-yellow-500 font-semibold px-8 py-3"
          >
            {t("placeOrder")}
          </Button>
        </div>
      </section>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
