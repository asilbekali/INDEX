"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "../service/language-contex"
import { useToast } from "../hooks/use-toaster"
import { deleteProductApi, getProducts, updateProductApi } from "../api/userApi"
import { Image } from "antd"
import AddProductModal from "../components/addproduct-modal"

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

const IMAGE_BASE_URL = "http://18.184.169.185/multer/"

const ProductList: React.FC = () => {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("frameType")
  const [allProductsCache, setAllProductsCache] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [currentPage, setCurrentPage] = useState(1)
  const [animatingRows, setAnimatingRows] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const itemsPerPage = 10

  // Trigger visibility animation on mount
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
        title: "Error",
        description: err.message || "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

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
    setSelectedProductId(productId)
    setActionType(type)
    setIsConfirmModalVisible(true)
  }

  const handleConfirm = async () => {
    if (selectedProductId !== null && actionType) {
      setAnimatingRows((prev) => new Set(prev).add(selectedProductId))
      try {
        if (actionType === "delete") {
          await deleteProductApi(selectedProductId)
          setAllProductsCache((prev) => prev.filter((p) => p.id !== selectedProductId))
          toast({ title: "Success", description: t("productDeleted") })
        } else if (actionType === "edit") {
          await updateProductApi(selectedProductId, { price: 1000000, name: "Updated Product" })
          toast({ title: "Success", description: t("productEdited") })
          setAllProductsCache((prev) =>
            prev.map((p) => (p.id === selectedProductId ? { ...p, price: 1000000, name: "Updated Product" } : p)),
          )
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || `Failed to ${actionType} product`,
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

  const handleProductAdded = (newProduct: ProductItem) => {
    setAllProductsCache((prev) => [newProduct, ...prev])
    toast({
      title: "Success",
      description: "Product added successfully!",
    })
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
        <p className="text-gray-600 mt-6 animate-pulse">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-full p-6 items-center justify-center text-red-500">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-lg font-semibold">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col h-full p-6 bg-gray-50 min-h-screen transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="relative w-full max-w-md group">
          <input
            type="text"
            placeholder={t("search")}
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
          <span className="relative z-10">{t("addProduct")}</span>
        </button>
      </div>

      {/* Tabs */}
      <div
        className={`flex border-b border-gray-200 mb-8 bg-white rounded-t-2xl shadow-sm overflow-hidden transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={() => setActiveTab("frameType")}
          className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative group overflow-hidden ${
            activeTab === "frameType"
              ? "text-[#009399] bg-[#009399]/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="relative z-10">{t("frameType")}</span>
          {activeTab === "frameType" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009399] rounded-full animate-in slide-in-from-left-full duration-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <button
          onClick={() => setActiveTab("inflatable")}
          className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative group overflow-hidden ${
            activeTab === "inflatable"
              ? "text-[#009399] bg-[#009399]/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="relative z-10">{t("inflatable")}</span>
          {activeTab === "inflatable" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009399] rounded-full animate-in slide-in-from-left-full duration-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Products Table */}
      {productsToDisplay.length > 0 ? (
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("image")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("productName")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("priceSum")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("quantity")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("frame")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("sizeDepth")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("tall")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors duration-300 hover:text-[#009399]">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productsToDisplay.map((product, index) => {
                  const currentPrice = product.price * (1 - (product.discount || 0) / 100)
                  const oldPrice = calculateOldPrice(product.price, product.discount)
                  const imageUrl = product.image.startsWith("http")
                    ? product.image
                    : `${IMAGE_BASE_URL}${product.image}`
                  const isAnimating = animatingRows.has(product.id)

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-gray-50 transition-all duration-300 group relative overflow-hidden ${
                        isAnimating ? "animate-pulse bg-red-50" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(20px)",
                        transition: `all 0.5s ease-out ${index * 50 + 500}ms`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#009399]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <td className="px-6 py-4 relative z-10">
                        <div className="relative group/image">
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-cover rounded-xl shadow-sm group-hover/image:shadow-lg transition-all duration-300 transform group-hover/image:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-xl" />
                        </div>
                      </td>

                      <td className="px-6 py-4 relative z-10">
                        <div className="font-medium text-gray-900 hover:text-[#009399] transition-colors duration-300 cursor-pointer">
                          {product.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 relative z-10">
                        <div className="flex flex-col">
                          {oldPrice && (
                            <span className="line-through text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-500">
                              {formatPrice(oldPrice)} сум
                            </span>
                          )}
                          <span className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#009399]">
                            {formatPrice(currentPrice)} сум
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 relative z-10">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform group-hover:scale-105 ${
                            product.count > 0
                              ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                              : "bg-red-100 text-red-800 group-hover:bg-red-200"
                          }`}
                        >
                          {product.count}
                        </span>
                      </td>

                      <td className="px-6 py-4 relative z-10">
                        <span className="capitalize text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
                          {product.frame}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-700 relative z-10 transition-colors duration-300 group-hover:text-gray-900">
                        {product.size}
                      </td>

                      <td className="px-6 py-4 text-gray-700 relative z-10 transition-colors duration-300 group-hover:text-gray-900">
                        {product.tall}
                      </td>

                      <td className="px-6 py-4 relative z-10">
                        <div className="flex items-center space-x-3">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 group/btn relative overflow-hidden"
                            onClick={() => showConfirmModal(product.id, "edit")}
                          >
                            <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-lg" />
                            <Pencil
                              size={18}
                              className="relative z-10 transition-transform duration-300 group-hover/btn:rotate-12"
                            />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 group/btn relative overflow-hidden"
                            onClick={() => showConfirmModal(product.id, "delete")}
                          >
                            <div className="absolute inset-0 bg-red-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-lg" />
                            <Trash2
                              size={18}
                              className="relative z-10 transition-transform duration-300 group-hover/btn:rotate-12"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center py-6 px-6 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-800">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
              {totalItems} results
            </div>
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <ChevronLeft size={16} className="mr-1 transition-transform duration-300 group-hover:-translate-x-1" />
                Previous
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
                      className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                        pageNumber === currentPage
                          ? "bg-[#009399] text-white shadow-lg scale-105"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
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
                className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                Next
                <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </nav>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-gray-400 mb-4 animate-bounce">
            <Search size={48} />
          </div>
          <p className="text-lg text-gray-600 mb-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
            No products found
          </p>
          <p className="text-sm text-gray-500 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Modals */}
      <AddProductModal isOpen={isAddModalVisible} onClose={handleAddModalClose} onProductAdded={handleProductAdded} />

      {/* Confirmation Modal */}
      {isConfirmModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCancel}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actionType === "delete" ? "Delete Product" : "Edit Product"}
            </h3>
            <p className="text-gray-600 mb-6">
              {actionType === "delete"
                ? "Are you sure you want to delete this product? This action cannot be undone."
                : "Are you sure you want to edit this product?"}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  actionType === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-[#009399] hover:bg-[#007a7f]"
                }`}
              >
                {actionType === "delete" ? "Delete" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
