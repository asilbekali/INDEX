import type { Pool } from "@/types/pool";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://18.184.169.185";

export interface Category {
  id: number;
  name: string;
}


async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    console.log("Fetch URL:", `${API_BASE_URL}${endpoint}`);
    console.log("Fetch options:", options);

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

export async function getAllPools(): Promise<Pool[]> {
  const result = await apiRequest<{ data: Pool[] }>("/product");
  return result.data;
}


export async function getPoolsByFrame(): Promise<{
  inflatable: Pool[];
  frame: Pool[];
}> {
  const all = await getAllPools();

  const inflatable = all.filter(pool => pool.frame === "circle");
  const frame = all.filter(pool => pool.frame === "square");

  return { inflatable, frame };
}


export async function getCategories(): Promise<Category[]> {
  const result = await apiRequest<{ data: Category[] }>("/category");
  return result.data;
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
