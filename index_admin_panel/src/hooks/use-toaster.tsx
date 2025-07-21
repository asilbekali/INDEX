"use client"

import * as React from "react"

type Toast = {
    id: string
    title?: string
    description?: string
    variant?: "default" | "destructive"
    duration?: number
}

type ToastContextType = {
    toast: (props: Omit<Toast, "id">) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const toast = React.useCallback((props: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9) // Simple unique ID
        const newToast = { id, ...props }
        setToasts((prev) => [...prev, newToast])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, props.duration || 5000) // Default duration 5 seconds
    }, [])

    const value = React.useMemo(() => ({ toast }), [toast])

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`p-4 rounded-md shadow-lg text-white max-w-xs w-full ${t.variant === "destructive" ? "bg-red-600" : "bg-gray-800"
                            }`}
                    >
                        {t.title && <div className="font-semibold">{t.title}</div>}
                        {t.description && <div className="text-sm">{t.description}</div>}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = React.useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}
