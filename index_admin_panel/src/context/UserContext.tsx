"use client";

import {
    createContext,
    useState,
    useEffect,
    type FC,
    type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    showNavbar: boolean;
    setShowNavbar: (value: boolean) => void;
    isLoading: boolean;
    logout: () => void;
};

export const Context = createContext<ContextType>({
    token: null,
    setToken: () => { },
    showNavbar: false,
    setShowNavbar: () => { },
    isLoading: true,
    logout: () => { },
});

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [showNavbar, setShowNavbar] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const expiry = localStorage.getItem("token_expiry");

        if (storedToken && expiry) {
            const now = Date.now();
            if (now >= Number(expiry)) {
                clearToken(false);
            } else {
                setTokenState(storedToken);
            }
        } else {
            clearToken(false);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (token) {
            const expiryTime = 3600000;
            timeout = setTimeout(() => {
                clearToken();
            }, expiryTime);
        }
        return () => clearTimeout(timeout);
    }, [token]);

    useEffect(() => {
        const publicRoutes = ["/login", "/register"];
        if (!token && !publicRoutes.includes(location.pathname)) {
            navigate("/login");
        }
    }, [location.pathname, token]);

    useEffect(() => {
        if (location.pathname === "/login" && token) {
            clearToken(false);
        }
    }, [location.pathname]);

    const clearToken = (redirect: boolean = true) => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        setTokenState(null);
        if (redirect) navigate("/login");
    };

    const setToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            const expiryTime = Date.now() + 3600000;
            localStorage.setItem("token_expiry", expiryTime.toString());
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("token_expiry");
        }
        setTokenState(newToken);
    };

    const logout = () => {
        clearToken();
    };

    return (
        <Context.Provider
            value={{ token, setToken, showNavbar, setShowNavbar, isLoading, logout }}
        >
            {children}
        </Context.Provider>
    );
};
