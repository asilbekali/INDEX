"use client"

import Sidebar from "../modules/SideBar"
import Header from "../modules/Header"
import DashboardRoutes from "../routes/DashboardLayout"

export default function DashboardLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* HEADER */}
            <Header />

            <div className="flex flex-1">
                {/* SIDEBAR — har doim ko‘rinadi */}
                <aside className="w-[250px] h-full bg-white border-r border-gray-200">
                    <Sidebar />
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-4 overflow-y-auto">
                    <DashboardRoutes />
                </main>
            </div>
        </div>
    )
}
