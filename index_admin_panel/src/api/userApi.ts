// ✅ UPDATED: user-api.ts (Yoki api/index.ts deb nomlashingiz mumkin)
import type { AxiosError } from "axios";
import api from "./axiosInstance";

const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError === true;
}

const clearProductCache = () => {
    apiCache.clear();
};

// AUTH
export const getUsers = async () => {
    const response = await api.get("/auth");
    return response.data;
};

export async function loginUser(email: string, password: string) {
    try {
        const response = await api.post("/auth/login", { email, password });
        if (response.data.token && typeof window !== "undefined") {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Login failed");
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function registerUser(
    name: string,
    email: string,
    password: string,
    image?: string
) {
    try {
        const response = await api.post("/auth/register-admin", {
            name,
            email,
            password,
            image: image || "default.png",
        });
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Registration failed");
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

// PRODUCTS
export async function getProducts(
    params?: Record<string, any>,
    forceRefresh = false
) {
    const cacheKey = JSON.stringify(params || {});
    if (!forceRefresh && apiCache.has(cacheKey)) {
        const cached = apiCache.get(cacheKey)!;
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        } else {
            apiCache.delete(cacheKey);
        }
    }

    try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.name) queryParams.append("name", params.name);
        if (params?.frame) queryParams.append("frame", params.frame);

        const response = await api.get(`/product?${queryParams.toString()}`);
        const data = response.data;
        apiCache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Product fetch failed");
        } else {
            throw new Error(
                "An unknown error occurred while fetching products"
            );
        }
    }
}

export async function addProductApi(productData: any) {
    try {
        const response = await api.post("/product", productData);
        clearProductCache();
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to add product");
        } else {
            throw new Error("An unknown error occurred while adding product");
        }
    }
}

export async function updateProductApi(productId: number, productData: any) {
    try {
        const response = await api.patch(`/product/${productId}`, productData);
        clearProductCache();
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to update product");
        } else {
            throw new Error("An unknown error occurred while updating product");
        }
    }
}

export async function deleteProductApi(productId: number) {
    try {
        const response = await api.delete(`/product/${productId}`);
        clearProductCache();
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to delete product");
        } else {
            throw new Error("An unknown error occurred while deleting product");
        }
    }
}

// IMAGE UPLOAD
export async function uploadImageApi(file: File) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post("/multer/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to upload image");
        } else {
            throw new Error("An unknown error occurred while uploading image");
        }
    }
}

export function getImageUrl(fileName: string): string {
    return `http://18.184.169.185/multer/${encodeURIComponent(fileName)}`;
}

// ORDERS
export async function getOrdersFromApi() {
    try {
        const response = await api.get("/order");
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to fetch orders");
        } else {
            throw new Error("An unknown error occurred while fetching orders");
        }
    }
}

export async function updateOrderStatus(orderId: string) {
    try {
        const response = await api.patch(`/order/${orderId}`, {
            status: "NoActive",
        });

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to update order");
        } else {
            throw new Error("An unknown error occurred while updating order");
        }
    }
}

export async function deleteOrderApi(orderId: number) {
    try {
        const response = await api.delete(`/order/${orderId}`);
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to delete order");
        } else {
            throw new Error("An unknown error occurred while deleting order");
        }
    }
}

// CATEGORY

export async function getCategoriesFromApi() {
    try {
        const response = await api.get("/category");
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            throw new Error(data?.message || "Failed to fetch categories");
        } else {
            throw new Error(
                "An unknown error occurred while fetching categories"
            );
        }
    }
}
