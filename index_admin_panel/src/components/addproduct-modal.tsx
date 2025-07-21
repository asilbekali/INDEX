"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "../service/language-contex"
import { useToast } from "../hooks/use-toaster"
import { addProductApi, uploadImageApi } from "../api/userApi"
import { X, Upload, ImageIcon, Sparkles } from "lucide-react"

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
    onProductAdded: (newProduct: any) => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onProductAdded }) => {
    const { t } = useLanguage()
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: 0,
        frame: "square",
        size: 0,
        status: "recomend",
        count: 0,
        discount: 0,
        tall: 0,
        categoryId: 1,
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    // Handle modal visibility animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(false)
            setIsClosing(false)
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden"
            // Trigger entrance animation
            const timer = setTimeout(() => setIsVisible(true), 50)
            return () => {
                clearTimeout(timer)
                document.body.style.overflow = "unset"
            }
        }
    }, [isOpen])

    // Handle modal close with animation
    const handleClose = () => {
        setIsClosing(true)
        setIsVisible(false)
        document.body.style.overflow = "unset"
        setTimeout(() => {
            onClose()
            setIsClosing(false)
        }, 500)
    }

    if (!isOpen && !isClosing) return null

    const resetForm = () => {
        setFormData({
            name: "",
            image: "",
            price: 0,
            frame: "square",
            size: 0,
            status: "recomend",
            count: 0,
            discount: 0,
            tall: 0,
            categoryId: 1,
        })
        setSelectedFile(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        if (name === "image" && e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
            setSelectedFile(e.target.files[0])
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]:
                    name === "price" ||
                        name === "count" ||
                        name === "size" ||
                        name === "tall" ||
                        name === "discount" ||
                        name === "categoryId"
                        ? Number(value)
                        : value,
            }))
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        let imageUrl = formData.image

        try {
            if (selectedFile) {
                const uploadResponse = await uploadImageApi(selectedFile)
                if (uploadResponse && uploadResponse.path) {
                    imageUrl = `${import.meta.env.BASE_URL}multer/${encodeURIComponent(uploadResponse.path)}`
                } else {
                    throw new Error("Image upload failed: Invalid response from server.")
                }
            }

            const productDataToSend = {
                ...formData,
                image: imageUrl,
            }

            const newProduct = await addProductApi(productDataToSend)
            onProductAdded({
                ...productDataToSend,
                id: newProduct.id || Date.now(),
                createAt: new Date().toISOString(),
            })

            toast({ title: "Success", description: t("productAdded") })
            resetForm()
            handleClose()
        } catch (err: any) {
            toast({
                title: "Error",
                description: `Error: ${err.message || err}`,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const formFields = [
        { name: "price", label: t("addProductPrice"), type: "number", delay: 500, icon: "💰" },
        { name: "count", label: t("addProductQuantity"), type: "number", delay: 550, icon: "📦" },
        {
            name: "frame",
            label: t("addProductFrame"),
            type: "select",
            delay: 600,
            icon: "🖼️",
            options: [
                { value: "square", label: "Square" },
                { value: "circle", label: "Circle" },
            ],
        },
        { name: "size", label: t("addProductSize"), type: "number", delay: 650, icon: "📏" },
        { name: "tall", label: t("addProductTall"), type: "number", delay: 700, icon: "📐" },
        { name: "categoryId", label: t("addProductCategory"), type: "number", delay: 750, icon: "🏷️" },
        { name: "discount", label: `${t("addProductDiscount")} (%)`, type: "number", delay: 800, icon: "🎯" },
        {
            name: "status",
            label: "Status",
            type: "select",
            delay: 850,
            icon: "⭐",
            options: [
                { value: "recomend", label: "Recommend" },
                { value: "discount", label: "Discount" },
                { value: "end", label: "End" },
            ],
        },
    ]

    const modalContent = (
        <React.Fragment>
            {/* Modal Backdrop - Only covers the viewport, doesn't affect sidebar/header */}
            <div
                className={`fixed inset-0 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: "linear-gradient(135deg, rgba(0, 147, 153, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    zIndex: 9999, // Very high z-index to ensure it's above everything
                }}
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div
                className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                style={{ zIndex: 10000 }} // Even higher z-index for the modal content
            >
                {/* Animated particles background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 15 }, (_, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 bg-[#009399]/30 rounded-full transition-all duration-1000 ${isVisible ? "animate-pulse" : ""
                                }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 150}ms`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Modal */}
                <div
                    className={`relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden transition-all duration-700 ease-out transform ${isVisible ? "scale-100 translate-y-0 rotate-0" : "scale-75 translate-y-12 rotate-1"
                        }`}
                    style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 147, 153, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#009399]/20 via-transparent to-[#009399]/20 p-[1px]">
                        <div className="h-full w-full rounded-3xl bg-white" />
                    </div>

                    {/* Header with enhanced design */}
                    <div
                        className={`relative flex items-center justify-between p-8 border-b border-gray-100 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                            }`}
                        style={{
                            background: "linear-gradient(135deg, rgba(0, 147, 153, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%)",
                        }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-3xl">
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#009399]/10 rounded-full animate-pulse" />
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#009399]/20 rounded-full animate-pulse delay-300" />
                            <div className="absolute top-4 right-4 w-6 h-6 bg-[#009399]/5 rounded-full animate-pulse delay-700" />
                        </div>

                        <div className="flex items-center space-x-4 relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#009399] to-[#007a7f] rounded-2xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-[#009399] to-[#007a7f] bg-clip-text text-transparent">
                                    {t("addNewProduct")}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Create something amazing</p>
                            </div>
                        </div>

                        <button
                            onClick={handleClose}
                            className="relative z-10 p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
                        >
                            <X
                                size={24}
                                className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300 group-hover:rotate-90"
                            />
                        </button>
                    </div>

                    {/* Scrollable content */}
                    <div
                        className="overflow-y-auto max-h-[calc(95vh-120px)]"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#009399 #f1f1f1" }}
                    >
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Product Name */}
                                <div
                                    className={`lg:col-span-2 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                        }`}
                                >
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-bold text-gray-700 mb-3 transition-colors duration-300 hover:text-[#009399]"
                                    >
                                        {t("addProductName")} ✨
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-[#009399]/20 focus:border-[#009399] transition-all duration-500 hover:border-gray-300 hover:shadow-lg focus:shadow-xl transform focus:scale-[1.02] bg-gradient-to-r from-white to-gray-50/50"
                                            placeholder="Enter an amazing product name..."
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Enhanced Image Upload */}
                                <div
                                    className={`lg:col-span-2 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                        }`}
                                >
                                    <label className="block text-sm font-bold text-gray-700 mb-3 transition-colors duration-300 hover:text-[#009399]">
                                        {t("addProductImage")} 📸
                                    </label>
                                    <div
                                        className={`relative border-3 border-dashed rounded-2xl p-8 transition-all duration-500 transform hover:scale-[1.02] group ${dragActive
                                                ? "border-[#009399] bg-gradient-to-br from-[#009399]/10 to-[#009399]/5 scale-[1.02] shadow-lg"
                                                : "border-gray-300 hover:border-[#009399]/50"
                                            } ${selectedFile
                                                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg"
                                                : "hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleChange}
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />

                                        <div className="text-center relative z-5">
                                            <div
                                                className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 transform group-hover:scale-110 ${selectedFile
                                                        ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg"
                                                        : dragActive
                                                            ? "bg-gradient-to-br from-[#009399] to-[#007a7f] shadow-lg scale-110"
                                                            : "bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#009399]/20 group-hover:to-[#009399]/10"
                                                    }`}
                                            >
                                                {selectedFile ? (
                                                    <ImageIcon className="w-8 h-8 text-white animate-bounce" />
                                                ) : (
                                                    <Upload
                                                        className={`w-8 h-8 transition-all duration-500 ${dragActive
                                                                ? "text-white scale-110 animate-bounce"
                                                                : "text-gray-400 group-hover:text-[#009399]"
                                                            }`}
                                                    />
                                                )}
                                            </div>

                                            {selectedFile ? (
                                                <div className="space-y-2">
                                                    <p className="text-lg font-semibold text-green-600">✅ {selectedFile.name}</p>
                                                    <p className="text-sm text-green-500">Ready to upload!</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <p className="text-lg text-gray-600">
                                                        <span className="font-bold text-[#009399] hover:text-[#007a7f] transition-colors duration-300 cursor-pointer">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    <div className="flex justify-center space-x-2 mt-4">
                                                        <div className="w-2 h-2 bg-[#009399]/30 rounded-full animate-pulse" />
                                                        <div
                                                            className="w-2 h-2 bg-[#009399]/50 rounded-full animate-pulse"
                                                            style={{ animationDelay: "150ms" }}
                                                        />
                                                        <div
                                                            className="w-2 h-2 bg-[#009399]/70 rounded-full animate-pulse"
                                                            style={{ animationDelay: "300ms" }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Form Fields */}
                                {formFields.map((field) => (
                                    <div
                                        key={field.name}
                                        className={`transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                            }`}
                                        style={{ transitionDelay: `${field.delay}ms` }}
                                    >
                                        <label
                                            htmlFor={field.name}
                                            className="block text-sm font-bold text-gray-700 mb-3 transition-colors duration-300 hover:text-[#009399]"
                                        >
                                            {field.icon} {field.label}
                                        </label>
                                        <div className="relative group">
                                            {field.type === "select" ? (
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    required={field.name !== "discount"}
                                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-[#009399]/20 focus:border-[#009399] transition-all duration-500 hover:border-gray-300 hover:shadow-lg focus:shadow-xl transform focus:scale-[1.02] bg-gradient-to-r from-white to-gray-50/50 appearance-none cursor-pointer"
                                                >
                                                    {field.options?.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    required={field.name !== "discount"}
                                                    min={field.type === "number" ? "0" : undefined}
                                                    max={field.name === "discount" ? "100" : undefined}
                                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-[#009399]/20 focus:border-[#009399] transition-all duration-500 hover:border-gray-300 hover:shadow-lg focus:shadow-xl transform focus:scale-[1.02] bg-gradient-to-r from-white to-gray-50/50"
                                                    placeholder="0"
                                                />
                                            )}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Enhanced Action Buttons */}
                            <div
                                className={`flex justify-end space-x-6 mt-12 pt-8 border-t-2 border-gray-100 transition-all duration-700 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-8 py-4 border-2 border-gray-300 rounded-2xl text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transform hover:scale-105 active:scale-95 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10">{t("cancel")}</span>
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-12 py-4 bg-gradient-to-r from-[#009399] to-[#007a7f] text-white font-bold rounded-2xl hover:from-[#007a7f] hover:to-[#006066] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-[#009399]/30 transform hover:scale-105 active:scale-95 relative overflow-hidden group shadow-lg hover:shadow-xl"
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                    {loading ? (
                                        <div className="flex items-center space-x-3 relative z-10">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Saving Magic...</span>
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                                                <div
                                                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                                                    style={{ animationDelay: "100ms" }}
                                                />
                                                <div
                                                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                                                    style={{ animationDelay: "200ms" }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <span>{t("save")}</span>
                                            <Sparkles className="w-5 h-5 animate-pulse" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

    // Use createPortal to render modal at document.body level
    return createPortal(modalContent, document.body)
}

export default AddProductModal
