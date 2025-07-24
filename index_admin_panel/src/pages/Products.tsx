"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, X, Upload, ImageIcon, Sparkles } from "lucide-react"
import { useLanguage } from "../service/language-contex"
import { useToast } from "../hooks/use-toaster"
import {
  deleteProductApi,
  getProducts,
  updateProductApi,
  addProductApi,
  uploadImageApi,
  getCategoriesFromApi,
  getImageUrl,
} from "../api/userApi"

interface ProductItem {
  id: number
  name: string
  image: string
  price: number
  frame: string
  size: number | string
  status: string
  count: number
  discount?: number
  tall: number
  categoryId: number
  createAt: string
}

const IMAGE_BASE_URL = `http://18.184.169.185`

const GlobalBackdrop: React.FC<{ isVisible: boolean; onClick: () => void }> = ({ isVisible, onClick }) => {
  if (!isVisible) return null
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out"
      style={{
        zIndex: 99999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
      }}
      onClick={onClick}
    />
  )
}

const ImageViewerModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  productName: string
}> = ({ isOpen, onClose, imageUrl, productName }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => setIsVisible(true), 50)
    } else {
      document.body.style.overflow = "unset"
      setIsVisible(false)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      <GlobalBackdrop isVisible={isVisible} onClick={handleClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100000 }}>
        <div
          className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-500 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{productName}</h3>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="p-4">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={productName}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  )
}

const EditProductModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onProductUpdated: (updatedProduct: ProductItem) => void
  product: ProductItem | null
}> = ({ isOpen, onClose, onProductUpdated, product }) => {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    frame: "square",
    size: "",
    tall: "",
    count: "",
    status: "recomend",
    categoryId: "1",
    configuration1: "",
    configuration2: "",
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesFromApi()
        setCategories(res.data)
      } catch (error) {
        console.error("Kategoriya olishda xatolik:", error)
      }
    }
    if (isOpen) {
      fetchCategories()
      document.body.style.overflow = "hidden"
      setTimeout(() => setIsVisible(true), 50)
    } else {
      document.body.style.overflow = "unset"
      setIsVisible(false)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && product) {
      setFormData({
        name: product.name || "",
        price: product.price.toString() || "",
        discount: product.discount?.toString() || "",
        frame: product.frame || "square",
        size: product.size.toString() || "",
        tall: product.tall.toString() || "",
        count: product.count.toString() || "",
        status: product.status || "recomend",
        categoryId: product.categoryId.toString() || "1",
        configuration1: "",
        configuration2: "",
      })
      document.body.style.overflow = "hidden"
      setTimeout(() => setIsVisible(true), 50)
    } else {
      document.body.style.overflow = "unset"
      setIsVisible(false)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return
    setIsSubmitting(true)
    try {
      const updateData = {
        name: formData.name,
        price: Number.parseFloat(formData.price),
        discount: formData.discount ? Number.parseFloat(formData.discount) : undefined,
        frame: formData.frame,
        size: Number.parseFloat(formData.size),
        tall: Number.parseFloat(formData.tall),
        count: Number.parseInt(formData.count),
        status: formData.status,
        categoryId: Number.parseInt(formData.categoryId),
      }
      await updateProductApi(product.id, updateData)
      onProductUpdated({ ...product, ...updateData })
      toast({
        title: t("success") || "Success",
        description: t("productEdited") || "Product updated successfully!",
      })
      handleClose()
    } catch (error: any) {
      toast({
        title: t("error") || "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  if (!isOpen) return null

  return (
    <>
      <GlobalBackdrop isVisible={isVisible} onClick={handleClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100000 }}>
        <div
          className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#009399] to-[#007a7f] rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t("editProduct") || "Редактировать продукт"}</h2>
                <p className="text-sm text-gray-500">{t("updateYourData") || "Update your product details"}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("productName") || "Название продукта"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">💰 {t("price") || "Цена (сум)"}</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📦 {t("quantity") || "Количество"}
                </label>
                <input
                  type="number"
                  name="count"
                  value={formData.count}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🖼️ {t("frame") || "Рамка"}</label>
                <select
                  name="frame"
                  value={formData.frame}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                >
                  <option value="square">{t("square") || "square"}</option>
                  <option value="circle">{t("circle") || "circle"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📏 {t("size") || "Размер (м)"}</label>
                <input
                  type="number"
                  step="0.1"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📐 {t("depth") || "Глубина(см)"}</label>
                <input
                  type="number"
                  name="tall"
                  value={formData.tall}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🏷️ {t("category") || "Категория"}</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>
                    {t("selectCategory") || "Категорияни танланг"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 {t("discount") || "Скидка (%)"}
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">⭐ {t("status") || "Статус"}</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399]"
                >
                  <option value="recomend">{t("recommend") || "Рекомендуем"}</option>
                  <option value="discount">{t("discount") || "Скидка"}</option>
                  <option value="end">{t("end") || "Заканчивается"}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
              >
                {t("cancel") || "Отмена"}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-[#009399] to-[#007a7f] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? "animate-pulse" : "hover:shadow-lg"
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t("updating") || "Обновление..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{t("update") || "Обновить"}</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const AddProductModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onProductAdded: (newProduct: ProductItem) => void
}> = ({ isOpen, onClose, onProductAdded }) => {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    frame: "square",
    size: "",
    tall: "",
    count: "",
    status: "recomend",
    categoryId: "",
    configuration1: "",
    configuration2: "",
  })
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesFromApi()
        setCategories(res.data)
      } catch (error) {
        console.error("Kategoriya olishda xatolik:", error)
      }
    }
    if (isOpen) {
      fetchCategories()
      document.body.style.overflow = "hidden"
      setTimeout(() => setIsVisible(true), 50)
    } else {
      document.body.style.overflow = "unset"
      setIsVisible(false)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
      setSelectedFile(e.target.files[0])
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
      setSelectedImage(e.dataTransfer.files[0])
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let imageUrl = ""
      if (selectedImage) {
        const imageResponse = await uploadImageApi(selectedImage)
        imageUrl = getImageUrl(imageResponse.path)
      }

      const productData = {
        name: formData.name,
        price: Number.parseFloat(formData.price),
        discount: formData.discount ? Number.parseFloat(formData.discount) : undefined,
        frame: formData.frame,
        size: Number.parseFloat(formData.size),
        tall: Number.parseFloat(formData.tall),
        count: Number.parseInt(formData.count),
        status: formData.status,
        categoryId: Number.parseInt(formData.categoryId),
        image: imageUrl,
      }
      const response = await addProductApi(productData)
      onProductAdded(response)
      toast({
        title: t("success") || "Success",
        description: t("productAdded") || "Product added successfully!",
      })
      handleClose()
      resetForm()
    } catch (error: any) {
      toast({
        title: t("error") || "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      discount: "",
      frame: "square",
      size: "",
      tall: "",
      count: "",
      status: "recomend",
      categoryId: "",
      configuration1: "",
      configuration2: "",
    })
    setSelectedImage(null)
    setSelectedFile(null)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      <GlobalBackdrop isVisible={isVisible} onClick={handleClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100000 }}>
        <div
          className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#009399] to-[#007a7f] rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t("addProduct") || "Добавить продукт"}</h2>
                <p className="text-sm text-gray-500">{t("createSomethingAmazing") || "Create something amazing"}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("productName") || "Название продукта"} ✨
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-None focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  placeholder={t("enterProductName") || "Enter product name..."}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("image") || "Изображение"} 📸</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${dragActive
                      ? "border-[#009399] bg-[#009399]/10"
                      : selectedImage
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-[#009399]/50"
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="text-center">
                    <div
                      className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${selectedImage ? "bg-green-500" : dragActive ? "bg-[#009399]" : "bg-gray-100"
                        }`}
                    >
                      {selectedImage ? (
                        <ImageIcon className="w-6 h-6 text-white" />
                      ) : (
                        <Upload className={`w-6 h-6 ${dragActive ? "text-white" : "text-gray-400"}`} />
                      )}
                    </div>
                    {selectedFile ? (
                      <div>
                        <p className="text-green-600 font-medium">✅ {selectedFile.name}</p>
                        <p className="text-sm text-green-500">{t("readyToUpload") || "Ready to upload!"}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600">
                          <span className="font-medium text-[#009399]">{t("clickToUpload") || "Click to upload"}</span>{" "}
                          {t("orDragAndDrop") || "or drag and drop"}
                        </p>
                        <p className="text-sm text-gray-500">{t("imageFormats") || "PNG, JPG, GIF up to 10MB"}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">💰 {t("price") || "Цена (сум)"}</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📦 {t("quantity") || "Количество"}
                </label>
                <input
                  type="number"
                  name="count"
                  value={formData.count}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🖼️ {t("frame") || "Рамка"}</label>
                <select
                  name="frame"
                  value={formData.frame}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="square">{t("square") || "square"}</option>
                  <option value="circle">{t("circle") || "circle"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📏 {t("size") || "Размер (м)"}</label>
                <input
                  type="number"
                  step="0.1"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📐 {t("depth") || "Глубина(см)"}</label>
                <input
                  type="number"
                  name="tall"
                  value={formData.tall}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🏷️ {t("category") || "Категория"}</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>
                    {t("selectCategory") || "Категорияни танланг"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 {t("discount") || "Скидка (%)"}
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">⭐ {t("status") || "Статус"}</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-200"
                >
                  <option value="recomend">{t("recommend") || "Рекомендуем"}</option>
                  <option value="discount">{t("discount") || "Скидка"}</option>
                  <option value="end">{t("end") || "Заканчивается"}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
              >
                {t("cancel") || "Отмена"}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-[#009399] to-[#007a7f] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? "animate-pulse" : "hover:shadow-lg"
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t("saving") || "Сохранение..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{t("save") || "Сохранить"}</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const ProductList: React.FC = () => {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("frameType")
  const [allProductsCache, setAllProductsCache] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState("")
  const [selectedImageName, setSelectedImageName] = useState("")
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [currentPage, setCurrentPage] = useState(1)
  const [animatingRows, setAnimatingRows] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)

  const itemsPerPage = 10

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const fetchAllProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getProducts({ page: 1, limit: Number.MAX_SAFE_INTEGER })
      if (response && Array.isArray(response.data)) {
        setAllProductsCache(response.data)
      } else {
        console.warn("API response for products is not in expected format:", response)
        setAllProductsCache([])
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch products")
      toast({
        title: t("error") || "Error",
        description: err.message || "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast, t])

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  const filteredProducts = useMemo(() => {
    let tempProducts = allProductsCache
    if (activeTab === "frameType") {
      tempProducts = tempProducts.filter((p) => p.frame === "square")
    } else if (activeTab === "inflatable") {
      tempProducts = tempProducts.filter((p) => p.frame === "circle")
    }

    if (debouncedSearchTerm) {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase()
      tempProducts = tempProducts.filter((p) => p.name.toLowerCase().includes(lowerCaseSearchTerm))
    }
    return tempProducts
  }, [allProductsCache, activeTab, debouncedSearchTerm])

  const productsToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, itemsPerPage])

  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU")
  }

  const calculateOldPrice = (price: number, discount?: number) => {
    if (discount && discount > 0) {
      return price / (1 - discount / 100)
    }
    return null
  }

  const showConfirmModal = (productId: number, type: "edit" | "delete") => {
    const product = allProductsCache.find((p) => p.id === productId)
    if (type === "edit" && product) {
      setSelectedProduct(product)
      setIsEditModalVisible(true)
    } else {
      setSelectedProductId(productId)
      setActionType(type)
      setIsConfirmModalVisible(true)
    }
  }

  const handleImageClick = (imageUrl: string, productName: string) => {
    setSelectedImageUrl(imageUrl)
    setSelectedImageName(productName)
    setIsImageViewerVisible(true)
  }

  const handleConfirm = async () => {
    if (selectedProductId !== null && actionType === "delete") {
      setAnimatingRows((prev) => new Set(prev).add(selectedProductId))
      try {
        await deleteProductApi(selectedProductId)
        setAllProductsCache((prev) => prev.filter((p) => p.id !== selectedProductId))
        toast({
          title: t("success") || "Success",
          description: t("productDeleted") || "Product deleted successfully!",
        })
      } catch (err: any) {
        toast({
          title: t("error") || "Error",
          description: err.message || `Failed to delete product`,
          variant: "destructive",
        })
      } finally {
        setTimeout(() => {
          setAnimatingRows((prev) => {
            const newSet = new Set(prev)
            newSet.delete(selectedProductId)
            return newSet
          })
        }, 300)
      }
    }
    setIsConfirmModalVisible(false)
    setSelectedProductId(null)
    setActionType(null)
  }

  const handleCancel = () => {
    setIsConfirmModalVisible(false)
    setSelectedProductId(null)
    setActionType(null)
  }

  const handleAddProductClick = () => {
    setIsAddModalVisible(true)
  }

  const handleAddModalClose = () => {
    setIsAddModalVisible(false)
  }

  const handleEditModalClose = () => {
    setIsEditModalVisible(false)
    setSelectedProduct(null)
  }

  const handleImageViewerClose = () => {
    setIsImageViewerVisible(false)
    setSelectedImageUrl("")
    setSelectedImageName("")
  }

  const handleProductAdded = (newProduct: ProductItem) => {
    setAllProductsCache((prev) => [newProduct, ...prev])
    toast({
      title: t("success") || "Success",
      description: t("productAdded") || "Product added successfully!",
    })
  }

  const handleProductUpdated = (updatedProduct: ProductItem) => {
    setAllProductsCache((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, debouncedSearchTerm])

  if (loading) {
    return (
      <div className="flex flex-col h-full p-6 items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#009399]/20 border-t-[#009399] rounded-full animate-spin" />
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#009399]/40 rounded-full animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          />
        </div>
        <p className="text-gray-600 mt-6 animate-pulse">{t("loadingProducts") || "Loading products..."}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-full p-6 items-center justify-center text-red-500">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-lg font-semibold">
            {t("error") || "Error"}: {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col h-full p-6 bg-gray-50 min-h-screen transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div
        className={`flex items-center justify-between mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="relative w-full max-w-md group">
          <input
            type="text"
            placeholder={t("search") || "Search..."}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#009399] focus:border-transparent transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md focus:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-[#009399] group-hover:scale-110"
            size={20}
          />
        </div>
        <button
          onClick={handleAddProductClick}
          className="bg-[#009399] text-white hover:bg-[#007a7f] transition-all duration-300 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-medium group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Plus size={20} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="relative z-10">{t("addProduct") || "Add Product"}</span>
        </button>
      </div>

      <div
        className={`flex border-b border-gray-200 mb-8 bg-white rounded-t-2xl shadow-sm overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <button
          onClick={() => setActiveTab("frameType")}
          className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative group overflow-hidden ${activeTab === "frameType"
              ? "text-[#009399] bg-[#009399]/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
        >
          <span className="relative z-10">{t("frameType") || "Frame Type"}</span>
          {activeTab === "frameType" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009399] rounded-full animate-in slide-in-from-left-full duration-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <button
          onClick={() => setActiveTab("inflatable")}
          className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative group overflow-hidden ${activeTab === "inflatable"
              ? "text-[#009399] bg-[#009399]/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
        >
          <span className="relative z-10">{t("inflatable") || "Inflatable"}</span>
          {activeTab === "inflatable" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009399] rounded-full animate-in slide-in-from-left-full duration-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {productsToDisplay.length > 0 ? (
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-20 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("image") || "Image"}
                  </th>
                  <th className="w-48 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("productName") || "Product Name"}
                  </th>
                  <th className="w-32 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("priceSum") || "Price"}
                  </th>
                  <th className="w-24 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("quantity") || "Quantity"}
                  </th>
                  <th className="w-32 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("frame") || "Frame"}
                  </th>
                  <th className="w-32 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("categoryId") || "categoryId"}
                  </th>
                  <th className="w-24 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("sizeDepth") || "Size/Depth"}
                  </th>
                  <th className="w-28 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {t("actions") || "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productsToDisplay.map((product, index) => {
                  const currentPrice = product.price * (1 - (product.discount || 0) / 100)
                  const oldPrice = calculateOldPrice(product.price, product.discount)
                  const imageUrl = product.image ? product.image : `${IMAGE_BASE_URL}${product.image}` // This line seems to have a potential issue if product.image is already a full URL.
                  const isAnimating = animatingRows.has(product.id)
                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-gray-50/50 transition-colors duration-200 ${isAnimating ? "animate-pulse bg-red-50" : ""
                        }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(20px)",
                        transition: `all 0.5s ease-out ${index * 50 + 500}ms`,
                      }}
                    >
                      <td className="w-20 px-4 py-4">
                        <div className="relative group/image">
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-cover rounded-xl shadow-sm group-hover/image:shadow-lg transition-all duration-300 transform group-hover/image:scale-110 cursor-pointer"
                            onClick={() => handleImageClick(imageUrl, product.name)}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-xl" />
                        </div>
                      </td>
                      <td className="w-48 px-4 py-4">
                        <div className="font-medium text-gray-900 hover:text-[#009399] transition-colors duration-300 cursor-pointer truncate">
                          {product.name}
                        </div>
                      </td>
                      <td className="w-32 px-4 py-4">
                        <div className="flex flex-col">
                          {oldPrice && (
                            <span className="line-through text-gray-400 text-xs whitespace-nowrap">
                              {formatPrice(oldPrice)} сум
                            </span>
                          )}
                          <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                            {formatPrice(currentPrice)} сум
                          </span>
                        </div>
                      </td>
                      <td className="w-24 px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${product.count > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                          {product.count}
                        </span>
                      </td>
                      <td className="w-32 px-4 py-4">
                        <span className="capitalize text-gray-700 text-sm truncate block">{product.frame}</span>
                      </td>
                      <td className="w-24 px-4 py-4 text-gray-700 text-sm">{product.size}</td>
                      <td className="w-24 px-4 py-4 text-gray-700 text-sm">{product.tall}</td>
                      <td className="w-28 px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
                            onClick={() => showConfirmModal(product.id, "edit")}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
                            onClick={() => showConfirmModal(product.id, "delete")}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center py-6 px-6 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {t("showing") || "Showing"} {(currentPage - 1) * itemsPerPage + 1} {t("to") || "to"}{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} {t("of") || "of"} {totalItems}{" "}
              {t("results") || "results"}
            </div>
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft size={16} className="mr-1" />
                {t("previous") || "Previous"}
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 ${pageNumber === currentPage
                          ? "bg-[#009399] text-white shadow-lg"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {t("next") || "Next"}
                <ChevronRight size={16} className="ml-1" />
              </button>
            </nav>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="text-gray-400 mb-4 animate-bounce">
            <Search size={48} />
          </div>
          <p className="text-lg text-gray-600 mb-2">{t("noProductsFound") || "No products found"}</p>
          <p className="text-sm text-gray-500">
            {t("tryAdjustingSearch") || "Try adjusting your search or filter criteria"}
          </p>
        </div>
      )}

      <AddProductModal isOpen={isAddModalVisible} onClose={handleAddModalClose} onProductAdded={handleProductAdded} />
      <EditProductModal
        isOpen={isEditModalVisible}
        onClose={handleEditModalClose}
        onProductUpdated={handleProductUpdated}
        product={selectedProduct}
      />
      <ImageViewerModal
        isOpen={isImageViewerVisible}
        onClose={handleImageViewerClose}
        imageUrl={selectedImageUrl}
        productName={selectedImageName}
      />

      {isConfirmModalVisible && (
        <>
          <GlobalBackdrop isVisible={true} onClick={handleCancel} />
          <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 100000 }}>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-500 scale-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("deleteProduct") || "Delete Product"}</h3>
              <p className="text-gray-600 mb-6">
                {t("confirmDeleteProductMessage") ||
                  "Are you sure you want to delete this product? This action cannot be undone."}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  {t("cancel") || "Cancel"}
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 rounded-xl text-white transition-all duration-300 bg-red-500 hover:bg-red-600"
                >
                  {t("delete") || "Delete"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductList
