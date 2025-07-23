export interface Pool {
  id: number
  name: string
  image: string
  price: number
  frame: "circle" | "square"
  size: number
  status: string
  count: number
  discount: number
  tall: number
  categoryId: number
  category?: {
    id: number
    name: string
  }
  createAt: string
}


export interface PoolFilters {
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  size?: number
  status?: "recomend" | "discount" | "end"
  frame?: "circle" | "square"
  inStock?: boolean
}


export interface OrderData {
  productId: number
  userName: string
  userPhone: string
  userLocation: string
  quantity: number
  notes?: string
}

