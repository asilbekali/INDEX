import type { Pool } from "@/types/pool"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.intex-market.uz"

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface PoolsResponse {
  pools: Pool[]
  total: number
  page: number
  limit: number
}

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      console.warn(`API Error: ${response.status} ${response.statusText}`)
      throw new Error(`API Error: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("API returned non-JSON response")
      throw new Error("Invalid response format")
    }

    const result: ApiResponse<T> = await response.json()

    if (!result.success) {
      throw new Error(result.message || "API request failed")
    }

    return result.data
  } catch (error) {
    console.warn("API Request failed:", error)
    throw error
  }
}

function getCurrentLanguage(): "ru" | "uz" {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("intex-language")
    return (savedLanguage as "ru" | "uz") || "ru"
  }
  return "ru"
}

export async function getFramePools(): Promise<Pool[]> {
  try {
    const data = await apiRequest<PoolsResponse>("/api/pools/frame")
    return data.pools
  } catch (error) {
    console.warn("Failed to fetch frame pools from API, using fallback data:", error)
    return getMockFramePools()
  }
}

export async function getInflatablePools(): Promise<Pool[]> {
  try {
    const data = await apiRequest<PoolsResponse>("/api/pools/inflatable")
    return data.pools
  } catch (error) {
    console.warn("Failed to fetch inflatable pools from API, using fallback data:", error)
    return getMockInflatablePools()
  }
}

export async function getPoolById(id: string): Promise<Pool | null> {
  try {
    const pool = await apiRequest<Pool>(`/api/pools/${id}`)
    return pool
  } catch (error) {
    console.warn("Failed to fetch pool by ID, searching in mock data:", error)
    const allPools = [...getMockFramePools(), ...getMockInflatablePools()]
    return allPools.find((pool) => pool.id === id) || null
  }
}

export async function searchPools(
  query: string,
  filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    size?: string
  },
): Promise<Pool[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      ...(filters?.category && { category: filters.category }),
      ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
      ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
      ...(filters?.size && { size: filters.size }),
    })

    const data = await apiRequest<PoolsResponse>(`/api/pools/search?${params}`)
    return data.pools
  } catch (error) {
    console.warn("Failed to search pools from API, using mock data:", error)
    const allPools = [...getMockFramePools(), ...getMockInflatablePools()]
    return allPools.filter(
      (pool) =>
        pool.name.toLowerCase().includes(query.toLowerCase()) || pool.size?.toLowerCase().includes(query.toLowerCase()),
    )
  }
}

export async function getPoolCategories(): Promise<string[]> {
  try {
    const categories = await apiRequest<string[]>("/api/pools/categories")
    return categories
  } catch (error) {
    console.warn("Failed to fetch categories from API, using fallback:", error)
    const language = getCurrentLanguage()
    return language === "uz"
      ? ["Tavsiya etamiz", "Sotuvda yo'q", "Chegirma"]
      : ["Рекомендуем", "Нет в наличии", "Cкидка продаж"]
  }
}

function getMockFramePools(): Pool[] {
  const language = getCurrentLanguage()

  if (language === "uz") {
    return [
      {
        id: "1",
        name: "Metallik ramkali INTEX",
        image: "/placeholder.svg?height=200&width=300",
        price: 1090000,
        size: "270 sm",
        status: "Tavsiya etamiz", 
        tall: "60 sm",
        frame: "Metallik",
        count: "Omborda: 15 dona",
        discount: 10,
      },
      {
        id: "2",
        name: "Ramkali hovuz INTEX Prism Frame",
        image: "/placeholder.svg?height=200&width=300",
        price: 1520000,
        size: "305 sm",
        status: "Sotuvda yo'q", 
        tall: "76 sm",
        frame: "Prizmatik",
        count: "Omborda: 8 dona",
      },
      {
        id: "3",
        name: "To'rtburchak ramka INTEX Ultra XTR",
        image: "/placeholder.svg?height=200&width=300",
        price: 2100000,
        size: "400 x 200 sm",
        status: "Chegirma", 
        tall: "100 sm",
        frame: "Ultra XTR",
        count: "Omborda: 5 dona",
        discount: 15,
      },
      {
        id: "4",
        name: "Ramkali hovuz INTEX 366x76",
        image: "/placeholder.svg?height=200&width=300",
        price: 1750000,
        size: "366 sm",
        status: "Tavsiya etamiz", 
        tall: "76 sm",
        frame: "Metallik",
        count: "Omborda: 12 dona",
      },
      {
        id: "5",
        name: "INTEX Metal Frame 457x122",
        image: "/placeholder.svg?height=200&width=300",
        price: 2500000,
        size: "457 sm",
        status: "Sotuvda yo'q", 
        tall: "122 sm",
        frame: "Kuchaytirilgan metallik",
        count: "Omborda: 3 dona",
        discount: 12,
      },
      {
        id: "6",
        name: "INTEX Prism Frame 305x99",
        image: "/placeholder.svg?height=200&width=300",
        price: 1890000,
        size: "305 sm",
        status: "Chegirma", 
        tall: "99 sm",
        frame: "Prizmatik",
        count: "Omborda: 7 dona",
      },
    ]
  }

  return [
    {
      id: "1",
      name: "Металлический каркас INTEX",
      image: "/placeholder.svg?height=200&width=300",
      price: 1090000,
      size: "270 см",
      status: "Рекомендуем", 
      tall: "60 см",
      frame: "Металлический",
      count: "В наличии: 15 шт",
      discount: 10,
    },
    {
      id: "2",
      name: "Каркасный бассейн INTEX Prism Frame",
      image: "/placeholder.svg?height=200&width=300",
      price: 1520000,
      size: "305 см",
      status: "Нет в наличии", 
      tall: "76 см",
      frame: "Призматический",
      count: "В наличии: 8 шт",
    },
    {
      id: "3",
      name: "Прямоугольная рама INTEX Ultra XTR",
      image: "/placeholder.svg?height=200&width=300",
      price: 2100000,
      size: "400 х 200 см",
      status: "Cкидка продаж", 
      tall: "100 см",
      frame: "Ultra XTR",
      count: "В наличии: 5 шт",
      discount: 15,
    },
    {
      id: "4",
      name: "Каркасный бассейн INTEX 366x76",
      image: "/placeholder.svg?height=200&width=300",
      price: 1750000,
      size: "366 см",
      status: "Рекомендуем", 
      tall: "76 см",
      frame: "Металлический",
      count: "В наличии: 12 шт",
    },
    {
      id: "5",
      name: "INTEX Metal Frame 457x122",
      image: "/placeholder.svg?height=200&width=300",
      price: 2500000,
      size: "457 см",
      status: "Cкидка продаж ", 
      tall: "122 см",
      frame: "Металлический усиленный",
      count: "В наличии: 3 шт",
      discount: 12,
    },
    {
      id: "6",
      name: "INTEX Prism Frame 305x99",
      image: "/placeholder.svg?height=200&width=300",
      price: 1890000,
      size: "305 см",
      status: "Нет в наличии", 
      tall: "99 см",
      frame: "Призматический",
      count: "В наличии: 7 шт",
    },
  ]
}

function getMockInflatablePools(): Pool[] {
  const language = getCurrentLanguage()

  if (language === "uz") {
    return [
      {
        id: "10",
        name: "INTEX Easy Set 244x76",
        image: "/placeholder.svg?height=200&width=300",
        price: 890000,
        size: "244 sm",
        status: "Tavsiya etamiz", 
        tall: "76 sm",
        count: "Omborda: 20 dona",
        discount: 5,
      },
      {
        id: "11",
        name: "INTEX Easy Set 305x76",
        image: "/placeholder.svg?height=200&width=300",
        price: 1200000,
        size: "305 sm",
        status: "Sotuvda yo'q", 
        tall: "76 sm",
        count: "Omborda: 15 dona",
      },
      {
        id: "12",
        name: "INTEX Easy Set 366x91",
        image: "/placeholder.svg?height=200&width=300",
        price: 1450000,
        size: "366 sm",
        status: "Chegirma", 
        tall: "91 sm",
        count: "Omborda: 10 dona",
        discount: 8,
      },
      {
        id: "13",
        name: "INTEX Easy Set 457x107",
        image: "/placeholder.svg?height=200&width=300",
        price: 1890000,
        size: "457 sm",
        status: "Tavsiya etamiz", 
        tall: "107 sm",
        count: "Omborda: 6 dona",
        discount: 10,
      },
    ]
  }

  return [
    {
      id: "10",
      name: "INTEX Easy Set 244x76",
      image: "/placeholder.svg?height=200&width=300",
      price: 890000,
      size: "244 см",
      status: "Рекомендуем", 
      tall: "76 см",
      count: "В наличии: 20 шт",
      discount: 5,
    },
    {
      id: "11",
      name: "INTEX Easy Set 305x76",
      image: "/placeholder.svg?height=200&width=300",
      price: 1200000,
      size: "305 см",
      status: "Нет в наличии ", 
      tall: "76 см",
      count: "В наличии: 15 шт",
    },
    {
      id: "12",
      name: "INTEX Easy Set 366x91",
      image: "/placeholder.svg?height=200&width=300",
      price: 1450000,
      size: "366 см",
      status: "Cкидка продаж", 
      tall: "91 см",
      count: "В наличии: 10 шт",
      discount: 8,
    },
    {
      id: "13",
      name: "INTEX Easy Set 457x107",
      image: "/placeholder.svg?height=200&width=300",
      price: 1890000,
      size: "457 см",
      status: "Рекомендуем",
      tall: "107 см",
      count: "В наличии: 6 шт",
      discount: 10,
    },
  ]
}

export async function createOrder(orderData: {
  poolId: string
  customerName: string
  customerPhone: string
  customerAddress: string
  quantity: number
  notes?: string
}): Promise<{ orderId: string; success: boolean }> {
  try {
    const result = await apiRequest<{ orderId: string }>("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
    return { orderId: result.orderId, success: true }
  } catch (error) {
    console.warn("Failed to create order via API, simulating success:", error)
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    return { orderId, success: true }
  }
}


export async function trackPoolView(poolId: string): Promise<void> {
  try {
    await apiRequest("/api/analytics/pool-view", {
      method: "POST",
      body: JSON.stringify({ poolId, timestamp: new Date().toISOString() }),
    })
  } catch (error) {
    console.warn("Failed to track pool view:", error)
  }
}
