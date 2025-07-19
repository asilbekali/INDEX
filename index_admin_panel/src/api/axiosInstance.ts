import axios from "axios";

// const token = localStorage.getItem("token");

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MjkxOTA5MCwiZXhwIjoxNzUyOTIyNjkwfQ.G9aZljk0Ay8LE8JoLaW3uYYPzUdJN846WDEYycFn1rw";

const api = axios.create({
    baseURL: process.env.VITE_API,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default api;
