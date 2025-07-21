"use client"
import { Package, ShoppingCart, LayoutGrid, Globe, ChevronRight } from "lucide-react"
import { useLanguage } from "../service/language-contex"
import { path } from "../hooks/paths"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navigationItems = [
    { name: t("products"), id: "products", icon: Package, path: path.product },
    { name: t("orders"), id: "orders", icon: ShoppingCart, path: path.order },
    { name: t("categories"), id: "categories", icon: LayoutGrid, path: path.category },
    { name: t("website"), id: "website", icon: Globe, href: path.notFound },
  ]

  const handleItemClick = (targetPath: string, isExternal = false) => {
    if (isExternal) {
      window.open(targetPath, "_blank", "noopener noreferrer")
    } else {
      navigate(targetPath)
    }
  }

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg relative overflow-hidden overflow-y-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#009398]/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#009398]/3 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <nav className="p-4 pt-6">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon
            const isExternal = !!item.href
            const targetPath = item.path || item.href!
            const isActive = location.pathname === item.path
            const isHovered = hoveredItem === item.id

            const linkContent = (
              <div className="flex items-center space-x-4 relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform ${isActive
                    ? "bg-white/20 text-white shadow-lg scale-110"
                    : isHovered
                      ? "bg-[#009398]/10 text-[#009398] scale-105"
                      : "text-gray-500"
                    }`}
                >
                  <IconComponent className={`w-5 h-5 transition-all duration-300 ${isHovered ? "rotate-3" : ""}`} />
                </div>
                <span
                  className={`font-semibold transition-all duration-300 ${isActive ? "text-white" : "text-gray-700"}`}
                >
                  {item.name}
                </span>
              </div>
            )

            return (
              <li
                key={item.id}
                className="relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Animated background */}
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-300 transform ${isActive
                    ? "bg-gradient-to-r from-[#009398] to-[#007a7f] shadow-lg scale-100 opacity-100"
                    : isHovered
                      ? "bg-gradient-to-r from-gray-100 to-gray-50 scale-95 opacity-100"
                      : "scale-90 opacity-0"
                    }`}
                />

                {/* Ripple effect */}
                {isHovered && !isActive && <div className="absolute inset-0 rounded-xl bg-[#009398]/5 animate-ping" />}

                {isExternal ? (
                  <a
                    href={targetPath}
                    className="relative w-full group flex items-center justify-between px-4 py-4 text-sm font-semibold rounded-xl transition-all duration-300 hover:translate-x-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {linkContent}
                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-300 transform ${isActive
                        ? "text-white translate-x-1"
                        : isHovered
                          ? "text-[#009398] translate-x-2 scale-110"
                          : "text-gray-400"
                        }`}
                    />
                  </a>
                ) : (
                  <button
                    onClick={() => handleItemClick(targetPath)}
                    className="relative w-full group flex items-center justify-between px-4 py-4 text-sm font-semibold rounded-xl transition-all duration-300 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-[#009398]/20"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {linkContent}
                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-300 transform ${isActive
                        ? "text-white translate-x-1 rotate-90"
                        : isHovered
                          ? "text-[#009398] translate-x-2 scale-110"
                          : "text-gray-400"
                        }`}
                    />

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full animate-pulse" />
                    )}
                  </button>
                )}

                {/* Hover glow effect */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#009398]/10 to-transparent blur-sm -z-10" />
                )}
              </li>
            )
          })}
        </ul>

        {/* Bottom decoration */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-[#009398]/30 to-transparent rounded-full" />
          </div>
        </div>
      </nav>

      {/* Floating action indicator */}
      <div className="absolute bottom-6 right-4">
        <div className="w-2 h-2 bg-[#009398] rounded-full animate-pulse" />
      </div>
    </div>
  )
}

export default Sidebar
