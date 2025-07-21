"use client"

import type React from "react"
import Sidebar from "../modules/SideBar"
import Header from "../modules/Header"
import DashboardRoutes from "../routes/DashboardLayout"

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* HEADER - Always visible with high z-index */}
            <div className="relative z-30">
                <Header />
            </div>

            <div className="flex flex-1">
                {/* SIDEBAR - Always visible with high z-index */}
                <aside className="w-[250px] h-full bg-white border-r border-gray-200 relative z-20">
                    <Sidebar />
                </aside>

                {/* MAIN CONTENT - Lower z-index */}
                <main className="flex-1 p-4 overflow-y-auto relative z-10">
                    <DashboardRoutes />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
