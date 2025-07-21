"use client"

import { useEffect, useState } from "react"
import { getFramePools } from "@/service/api"
import PoolsGrid from "@/components/pools/pools-grid"
import { useLanguage } from "@/hooks/use-language"
import type { Pool } from "@/types/pool"

function LoadingPools() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  const { t } = useLanguage()
  const [pools, setPools] = useState<Pool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPools() {
      try {
        const data = await getFramePools()
        setPools(data)
      } catch (error) {
        console.error("Failed to fetch pools:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPools()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-teal text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">{t("framePoolsPageTitle")}</h1>
        </div>
      </div>

      {loading ? (
        <LoadingPools />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <PoolsGrid pools={pools} />
        </div>
      )}
    </div>
  )
}
