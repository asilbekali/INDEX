// src/context/UserContext.tsx
"use client"

import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    type ReactNode,
} from "react"
import { useLocation, useNavigate } from "react-router-dom"

type ContextType = {
    token: string | null
    setToken: (token: string | null) => void
    showNavbar: boolean
    setShowNavbar: (value: boolean) => void
    isLoading: boolean
    logout: () => void
}

export const Context = createContext<ContextType>({
    token: null,
    setToken: () => { },
    showNavbar: false,
    setShowNavbar: () => { },
    isLoading: true,
    logout: () => { },
})

export const GlobalContext = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null)
    const [showNavbar, setShowNavbar] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const navigate = useNavigate()
    const location = useLocation()

    const clearToken = useCallback((redirect = true) => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userImage")
        localStorage.removeItem("token_expiry")
        setTokenState(null)
        if (redirect) navigate("/login")
    }, [navigate])

    const checkTokenValidity = useCallback(() => {
        const storedToken = localStorage.getItem("token")
        const expiry = localStorage.getItem("token_expiry")

        if (storedToken && expiry) {
            const now = Date.now()
            const expiryTime = Number(expiry)

            if (now >= expiryTime) {
                clearToken(true)
            } else {
                setTokenState(storedToken)
                const timeLeft = expiryTime - now

                setTimeout(() => {
                    clearToken(true)
                }, timeLeft)
            }
        } else {
            clearToken(false)
        }

        setIsLoading(false)
    }, [clearToken])

    useEffect(() => {
        checkTokenValidity()
    }, [checkTokenValidity])

    // 🔒 Token yo‘q bo‘lsa, faqat login yoki register sahifasiga ruxsat beriladi
    useEffect(() => {
        const publicRoutes = ["/login", "/register"]
        const isPublic = publicRoutes.includes(location.pathname)

        if (!token && !isPublic) {
            navigate("/login")
        }

        if (token && location.pathname === "/login") {
            navigate("/order")
        }
    }, [location.pathname, token, navigate])

    const setToken = useCallback(
        (newToken: string | null) => {
            if (newToken) {
                const expiryTime = Date.now() + 60 * 60 * 1000 // 1 hour
                localStorage.setItem("token", newToken)
                localStorage.setItem("token_expiry", expiryTime.toString())
                setTokenState(newToken)

                setTimeout(() => {
                    clearToken(true)
                }, 60 * 60 * 1000)
            } else {
                clearToken(true)
            }
        },
        [clearToken]
    )

    const logout = useCallback(() => {
        clearToken(true)
    }, [clearToken])

    const value = useMemo(
        () => ({
            token,
            setToken,
            showNavbar,
            setShowNavbar,
            isLoading,
            logout,
        }),
        [token, setToken, showNavbar, setShowNavbar, isLoading, logout]
    )

    return <Context.Provider value={value}>{children}</Context.Provider>
}
