import api from "./axiosInstance";

const getUsers = async () => {
    const response = await api.get("/auth");
    return response.data;
};

async function loginUser(email: string, password: string) {
    try {
        const response = await api.post("/auth/login", { email, password });
        console.log(response.data);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
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
            image: image || "default.png", // Agar rasm bo'lmasa, default qiymat
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

function isAxiosError(error: any): error is import("axios").AxiosError {
    return error.isAxiosError === true;
}

export { getUsers, loginUser, registerUser };
