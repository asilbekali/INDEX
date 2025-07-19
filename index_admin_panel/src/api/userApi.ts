import api from "./axiosInstance";

export const getUsers = async () => {
    const response = await api.get("/auth");
    return response.data;
};
