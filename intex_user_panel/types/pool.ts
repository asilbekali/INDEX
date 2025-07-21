export interface Pool {
  id: string
  name: string
  image: string
  price: number
  frame?: string
  size: string
  status?: string
  count?: string
  discount?: number
  tall: string
  description?: string
  features?: string[]
  inStock?: boolean
  category?: "frame" | "inflatable"
  createdAt?: string
  updatedAt?: string
}

export interface PoolFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  size?: string
  inStock?: boolean
  status?: string
}

export interface OrderData {
  poolId: string
  customerName: string
  customerPhone: string
  customerAddress: string
  quantity: number
  notes?: string
}
