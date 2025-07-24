"use client"
import { useEffect, useState } from "react"
import { getPoolsByFrame } from "@/service/api"
import { useLanguage } from "@/hooks/use-language"
import type { Pool } from "@/types/pool"
import PoolsGrid from "@/components/pools/pools"


export default function Page() {
  const { t } = useLanguage()
  const [pools, setPools] = useState<Pool[]>([])

  useEffect(() => {
    getPoolsByFrame().then(({ inflatable }) => {
      setPools(inflatable);
    });
  }, []);

  return (
      <div className="min-h-screen bg-gray-50 ">
        <div className="bg-primary-teal text-white py-2">
          <div className="container mx-auto px-4 ">
            <h1 className="text-3xl font-bold text-center">{t("inflatablePoolsPageTitle")}</h1>  
          </div>
        </div>
          <div className="container mx-auto px-4 py-8">
            <PoolsGrid pools={pools} />
          </div> 
      </div>
  )
}
