"use client"

import { useState, useEffect } from "react"
import type { Pool } from "@/types/pool"
import { getFramePools, getInflatablePools, searchPools } from "@/service/api"

export function useFramePools() {
  const [pools, setPools] = useState<Pool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPools() {
      try {
        setLoading(true)
        const data = await getFramePools()
        setPools(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch pools")
      } finally {
        setLoading(false)
      }
    }

    fetchPools()
  }, [])

  return { pools, loading, error }
}

export function useInflatablePools() {
  const [pools, setPools] = useState<Pool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPools() {
      try {
        setLoading(true)
        const data = await getInflatablePools()
        setPools(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch pools")
      } finally {
        setLoading(false)
      }
    }

    fetchPools()
  }, [])

  return { pools, loading, error }
}

export function usePoolSearch() {
  const [results, setResults] = useState<Pool[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await searchPools(query)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, search }
}
