"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Pool } from "@/types/pool"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"

interface PoolCardProps {
  pool: Pool
  onOrder?: (pool: Pool) => void
}

export default function PoolCard({ pool, onOrder }: PoolCardProps) {
  const { t } = useLanguage()
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price)
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()

    if (statusLower.includes("рекомендуем") || statusLower.includes("tavsiya")) {
      return "bg-green-500"
    }

    if (statusLower.includes("в") || statusLower.includes("yo'q")) {
      return "bg-red-500"
    }

    if (statusLower.includes("продаж") || statusLower.includes("chegirma")) {
      return "bg-yellow-500"
    }

    return "bg-green-500"
  }

  const getTranslatedStatus = (status: string) => {
    const statusLower = status.toLowerCase()

    if (statusLower.includes("рекомендуем") || statusLower.includes("tavsiya")) {
      return t("recommended")
    }
    if (statusLower.includes("в") || statusLower.includes("yo'q")) {
      return t("hitProduct")
    }
    if (statusLower.includes("продаж") || statusLower.includes("chegirma")) {
      return t("framePrism")
    }

    return status
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleOrder = () => {
    if (onOrder) {
      onOrder(pool)
    }
  }

  return (
    <div className="pool-card relative h-full flex flex-col">
      <div className="p-4 flex flex-col h-full">
        {pool.status && (
          <div className="mb-3">
            <span
              className={`inline-block ${getStatusColor(pool.status)} text-white px-3 py-1 text-xs font-semibold rounded-md`}
            >
              {getTranslatedStatus(pool.status)}
            </span>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-4 text-center line-clamp-2 text-primary-teal">{pool.name}</h3>

        <div className="mb-4 relative">
          <Image
            src={imageError ? "/placeholder.svg?height=200&width=300&query=intex pool" : pool.image}
            alt={pool.name}
            width={300}
            height={200}
            className="pool-card-image"
            onError={handleImageError}
            loading="lazy"
          />
          {pool.discount && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1">-{pool.discount}%</Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <p>
            <span className="font-medium">{t("size")}:</span> {pool.size}
          </p>
          {pool.frame && (
            <p>
              <span className="font-medium">{t("frame")}:</span> {pool.frame}
            </p>
          )}
          <p>
            <span className="font-medium">{t("height")}:</span> {pool.tall}
          </p>
          {pool.count && (
            <p
              className={`font-medium ${pool.count.includes("В наличии") || pool.count.includes("Omborda") ? "text-green-600" : "text-red-600"}`}
            >
              {pool.count}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            {pool.discount ? (
              <div className="flex flex-col">
                <span className="text-lg line-through text-gray-400">
                  {formatPrice(Math.round(pool.price / (1 - pool.discount / 100)))} {t("sum")}
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(pool.price)} {t("sum")}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                {formatPrice(pool.price)} {t("sum")}
              </span>
            )}
          </div>
        </div>

        <Button
          className="order-button w-full mt-auto"
          onClick={handleOrder}
          disabled={pool.count?.includes("Нет в наличии") || pool.count?.includes("yo'q")}
        >
          {pool.count?.includes("Нет в наличии") || pool.count?.includes("yo'q") ? t("outOfStock") : t("order")}
        </Button>
      </div>
    </div>
  )
}
