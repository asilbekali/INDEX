"use client"

import { useContext, useEffect, useState } from "react"
import { Dropdown, Button } from "antd"
import { User, Globe, X, Check } from "lucide-react"
import { languages, useLanguage } from "../service/language-contex"
import { Context } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const { t, currentLanguage, setLanguage } = useLanguage()
  const { setToken } = useContext(Context)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [adminName, setAdminName] = useState<string | null>(null)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)


  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const navigate = useNavigate()



  useEffect(() => {
    const name = localStorage.getItem("userName")
    const email = localStorage.getItem("userEmail")
    setAdminName(name)
    setAdminEmail(email)

  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("token_expiry")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("userImage")

    setToken(null)
    closeModal()
    navigate("/login")
  }

  const handleClickOutside = (event: MouseEvent) => {
    const modalContent = document.querySelector(".modal-content")
    if (modalContent && !modalContent.contains(event.target as Node)) {
      closeModal()
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isModalOpen])

  const adminData = {
    name: adminName || localStorage.getItem("userName"),
    email: adminEmail || localStorage.getItem("userEmail"),
    image: localStorage.getItem("userImage"),
  }

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm relative z-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#009398] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <h1 className="text-xl font-bold text-[#009398] tracking-wide">{t("title")}</h1>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <Dropdown
            menu={{
              items: Object.values(languages).map((lang) => ({
                key: lang.code,
                label: (
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                    {currentLanguage === lang.code && <Check className="ml-auto h-4 w-4" />}
                  </div>
                ),
                onClick: () => setLanguage(lang.code),
              })),
            }}
            placement="bottomRight"
          >
            <Button type="text" className="flex items-center gap-1 hover:text-gray-700 transition-colors">
              <span>{languages[currentLanguage].flag}</span>
              <span>{languages[currentLanguage].name}</span>
            </Button>
          </Dropdown>
          <span className="text-gray-300">|</span>
          <a
            href="https://kun.uz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-700 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{t("viewWebsite")}</span>
          </a>
          <span className="text-gray-300">|</span>
          <div
            onClick={openModal}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{adminData.name}</span>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            animation: "modalFadeIn 0.4s ease-out",
          }}
        >
          <div
            className="modal-content bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl w-96 max-w-md mx-4 border border-gray-200/50 overflow-hidden"
            style={{ animation: "modalSlideUp 0.4s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#009398] via-[#00a5aa] to-[#007a7f] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <h2 className="text-xl font-bold relative z-10">{t("adminProfile")}</h2>
              <Button
                type="text"
                onClick={closeModal}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 relative z-10"
              >
                <X className="text-white text-lg" />
              </Button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-[#009398] via-[#00a5aa] to-[#007a7f] rounded-2xl flex items-center justify-center mb-6 overflow-hidden shadow-xl transition-all duration-200 group relative">
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  )}
                  <img
                    src={adminData.image || "/placeholder.svg"}
                    alt="Admin Profile"
                    className="w-full h-full object-cover transition-transform duration-200"
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                      if (nextElement) {
                        nextElement.style.display = "flex"
                      }
                      setImageLoading(false)
                    }}
                  />
                  <User
                    className="text-white text-3xl transition-transform duration-200"
                    style={{ display: imageLoading ? "none" : "flex" }}
                  />
                </div>

                <div className="w-full space-y-4">
                  <div className="text-left group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-[#009398] transition-colors duration-200">
                      {t("name")}
                    </label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#009398]/30">
                      <p className="text-gray-800 font-semibold hover:text-[#009398] transition-colors duration-200">
                        {adminData.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-left group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-[#009398] transition-colors duration-200">
                      {t("email")}
                    </label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#009398]/30">
                      <p className="text-gray-800 font-semibold hover:text-[#009398] transition-colors duration-200">
                        {adminData.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50/50 border-t border-gray-200/50">
              <Button danger block onClick={handleLogout} className="font-semibold">
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  )
}

export default Header
