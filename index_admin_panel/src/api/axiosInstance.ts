import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        "Content-Type": "application/json",
    },
});import.meta.env.VITE_API

api.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token")?.trim()
                : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
