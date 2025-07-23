"use client"

import { useState } from "react"
import PoolCard from "@/components/pools/pool-card"
import OrderModal from "@/components/pools/order-modal"
import type { Pool } from "@/types/pool"

interface PoolsGridProps {
  pools: Pool[]
}

export default function PoolsGrid({ pools }: PoolsGridProps) {
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const handleOrder = (pool: Pool) => {
    setSelectedPool(pool)
    setIsOrderModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsOrderModalOpen(false)
    setSelectedPool(null)
  }

  if (pools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Бассейны не найдены</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap justify-start gap-6 items-stretch">
        {Array.isArray(pools) && pools.map((pool) => (
  <PoolCard key={pool.id} pool={pool} onOrder={handleOrder} />
))}

      </div>

      {selectedPool && <OrderModal pool={selectedPool} isOpen={isOrderModalOpen} onClose={handleCloseModal} />}
    </>
  )
}
