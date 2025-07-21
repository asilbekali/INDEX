import type { AxiosError } from "axios";
import api from "./axiosInstance"; // Import the configured axios instance

// Simple in-memory cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Function to clear the entire product cache
const clearProductCache = () => {
    // For simplicity, we'll clear all entries for now.
    // In a more complex app, you might clear specific keys or categories.
    apiCache.clear();
    console.log("Product cache cleared.");
};

const getUsers = async () => {
    const response = await api.get("/auth");
    return response.data;
};

async function loginUser(email: string, password: string) {
    try {
        const response = await api.post("/auth/login", { email, password });
        console.log(response.data);
        if (response.data.token) {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", response.data.token);
            }
        }
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            if (data && typeof data.message === "string") {
                throw new Error(data.message);
            } else {
                throw new Error("Login failed");
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

async function registerUser(
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
            if (data && typeof data.message === "string") {
                throw new Error(data.message);
            } else {
                throw new Error("Registration failed");
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

async function getProducts(params?: Record<string, any>, forceRefresh = false) {
    const cacheKey = JSON.stringify(params || {}); // Create a unique key based on request parameters

    // Check if data exists in cache and is still fresh, unless forceRefresh is true
    if (!forceRefresh && apiCache.has(cacheKey)) {
        const cachedEntry = apiCache.get(cacheKey)!;
        if (Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
            console.log("Returning products from cache for key:", cacheKey);
            return cachedEntry.data;
        } else {
            console.log("Cache expired for key:", cacheKey);
            apiCache.delete(cacheKey); // Invalidate expired cache entry
        }
    }

    try {
        console.log(
            "Fetching products from API for key:",
            cacheKey,
            " (forceRefresh:",
            forceRefresh,
            ")"
        );
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.name) queryParams.append("name", params.name);
        if (params?.frame) queryParams.append("frame", params.frame);

        const response = await api.get(`/product?${queryParams.toString()}`);
        const data = response.data;

        // Store the new data in cache with a timestamp
        apiCache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            if (data && typeof data.message === "string") {
                throw new Error(data.message);
            } else {
                throw new Error("Product fetch failed");
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(
                "An unknown error occurred while fetching products"
            );
        }
    }
}

// Actual API call for adding a product
async function addProductApi(productData: any) {
    try {
        const response = await api.post("/product", productData);
        console.log("Product added:", response.data);
        clearProductCache(); // Invalidate cache after adding
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            if (data && typeof data.message === "string") {
                throw new Error(data.message);
            } else {
                throw new Error("Failed to add product");
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred while adding product");
        }
    }
}

// Actual API call for updating a product
async function updateProductApi(productId: number, productData: any) {
    try {
        const response = await api.put(`/product/${productId}`, productData);
        console.log("Product updated:", response.data);
        clearProductCache(); // Invalidate cache after updating
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            if (data && typeof data.message === "string") {
                throw new Error(data.message);
            } else {
                throw new Error("Failed to update product");
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred while updating product");
        }
    }
}

// Actual API call for deleting a product
async function deleteProductApi(productId: number) {
    try {
        const response = await api.delete(`/product/${productId}`);
        console.log("Product deleted:", response.data);
        clearProductCache(); // Invalidate cache after deleting
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const data = error.response?.data as any;
            if (data && typeof data.message === "string") {
                throw new Error(data.message);
            } else {
                throw new Error("Failed to delete product");
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred while deleting product");
        }
    }
}

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError === true;
}

export {
    getUsers,
    loginUser,
    registerUser,
    getProducts,
    addProductApi,
    updateProductApi,
    deleteProductApi,
};
