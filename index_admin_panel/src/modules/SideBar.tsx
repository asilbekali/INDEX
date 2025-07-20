"use client"

import {
  Package,
  ShoppingCart,
  LayoutGrid,
  Globe,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "../service/language-contex";
import { path } from "../hooks/paths";
import { useNavigate, useLocation } from "react-router-dom"; 

const Sidebar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navigationItems = [
    { name: t("products"), id: "products", icon: Package, path: path.product },
    { name: t("orders"), id: "orders", icon: ShoppingCart, path: path.order },
    { name: t("categories"), id: "categories", icon: LayoutGrid, path: path.category },
    { name: t("website"), id: "website", icon: Globe, href: path.notFound }
  ];

  const handleItemClick = (targetPath: string, isExternal = false) => {
    if (isExternal) {
      window.open(targetPath, "_blank", "noopener noreferrer");
    } else {
      navigate(targetPath); 
    }
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
      <nav className="p-4 pt-8">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isExternal = !!item.href;
            const targetPath = item.path || item.href!;
            const isActive = location.pathname === item.path;

            const linkContent = (
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-[#009398]"
                  }`}
                >
                  <IconComponent className="text-base" />
                </div>
                <span className="font-semibold">{item.name}</span>
              </div>
            );

            return (
              <li key={item.id}>
                {isExternal ? (
                  <a
                    href={targetPath}
                    className="w-full group flex items-center justify-between px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 text-gray-700 hover:text-[#009398] hover:bg-gray-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkContent}
                    <ChevronRight className="text-xs text-gray-500 group-hover:text-[#009398]" />
                  </a>
                ) : (
                  <button
                    onClick={() => handleItemClick(targetPath)}
                    className={`w-full group flex items-center justify-between px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#009398] text-white shadow-md"
                        : "text-gray-700 hover:text-[#009398] hover:bg-gray-100"
                    }`}
                  >
                    {linkContent}
                    {isActive && <ChevronRight className="text-xs text-white" />}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
