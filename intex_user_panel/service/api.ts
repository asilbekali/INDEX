import type { Pool } from "@/types/pool";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://18.184.169.185";


async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    console.log(" Fetch URL:", `${API_BASE_URL}${endpoint}`);
    console.log(" Fetch options:", options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}


export async function getFramePools(): Promise<Pool[]> {
  const result = await apiRequest<{ data: Pool[] }>("/product");
  return result.data;
}

export async function getInflatablePools(): Promise<Pool[]> {
  const result = await apiRequest<{ data: Pool[] }>("/product");
  return result.data;
}


export async function getPoolById(id: string): Promise<Pool | null> {
  try {
    const pool = await apiRequest<Pool>(`/product/${id}`);
    return pool;
  } catch (error) {
    return null;
  }
}

export async function searchPools(
  query: string,
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
  }
): Promise<Pool[]> {
  const params = new URLSearchParams({
    search: query,
    ...(filters?.category && { category: filters.category }),
    ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
    ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
    ...(filters?.size && { size: filters.size }),
  });

  const data = await apiRequest<Pool[]>(`/product?${params}`);
  return data;
}

export async function getPoolCategories(): Promise<string[]> {
  return await apiRequest<string[]>("/category");
}

export async function createOrder(orderData: {
  productId: number;
  userName: string;
  userPhone: string;
  userLocation: string;
}): Promise<{ orderId: string; success: boolean }> {
  const result = await apiRequest<{ orderId: string }>("/order", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  return { orderId: result.orderId, success: true };
}

