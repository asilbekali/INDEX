export type { Pool } from "./pool"

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchParams {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}
