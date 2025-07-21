"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { useLanguage } from "../service/language-contex"
import { useToast } from "../hooks/use-toaster"
import { deleteProductApi, getProducts, updateProductApi } from "../api/userApi"
import { Image } from "antd"
import AddProductModal from "../components/addproduct-modal"

type ProductItem = {
  id: number
  name: string
  image: string // This will be a relative path from the API
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

const IMAGE_BASE_URL = "http://18.184.169.185/multer/" // Base URL for images

export default function ProductList() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("frameType")
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false) // Renamed for clarity
  const [isAddModalVisible, setIsAddModalVisible] = useState(false) // State for add modal
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 1000)
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Define fetchProducts using useCallback to ensure stability
  const fetchProducts = useCallback(
    async (forceRefresh = false) => {
      setLoading(true)
      setError(null)
      try {
        const frameFilter = activeTab === "frameType" ? "square" : activeTab === "inflatable" ? "circle" : undefined
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          name: debouncedSearchTerm || undefined,
          frame: frameFilter,
        }
        const response = await getProducts(params, forceRefresh) // Pass forceRefresh
        if (response && Array.isArray(response.data)) {
          setProducts(response.data)
          setTotalItems(response.total || 0)
        } else {
          console.warn("API response for products is not in expected format:", response)
          setProducts([])
          setTotalItems(0)
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
    },
    [currentPage, activeTab, debouncedSearchTerm, toast, t], // Dependencies for useCallback
  )

  // Initial fetch and re-fetch on pagination/tab/search changes
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]) // Now depends on the stable fetchProducts function

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
      try {
        if (actionType === "delete") {
          await deleteProductApi(selectedProductId) // Call actual delete API
          // Optimistic UI update: remove from list immediately
          setProducts((prev) => prev.filter((p) => p.id !== selectedProductId))
          toast({ title: "Success", description: t("productDeleted") })
        } else if (actionType === "edit") {
          // For edit, you'd typically open an edit modal to get updated data.
          // For now, we'll simulate an update and then force a refresh.
          // In a real app, you would pass the updated product data here from an edit form.
          await updateProductApi(selectedProductId, { price: 1000000, name: "Updated Product" }) // Example update
          toast({ title: "Success", description: t("productEdited") })
        }
        // After successful CUD operation, force a refresh of the product list
        fetchProducts(true)
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || `Failed to ${actionType} product`,
          variant: "destructive",
        })
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

  const handleProductAdded = () => {
    fetchProducts(true) // Force refresh after a new product is added
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, debouncedSearchTerm])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (loading) {
    return <div className="flex flex-col h-full p-6 items-center justify-center">Loading products...</div>
  }

  if (error) {
    return <div className="flex flex-col h-full p-6 items-center justify-center text-red-500">Error: {error}</div>
  }

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder={t("search")}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009399]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          onClick={handleAddProductClick}
          className="bg-[#009399] text-white hover:bg-[#007a7f] transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-xl shadow-md"
        >
          <Plus size={18} />
          <span>{t("addProduct")}</span>
        </button>
      </div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("frameType")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === "frameType"
            ? "text-[#009399] border-b-2 border-[#009399]"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {t("frameType")}
        </button>
        <button
          onClick={() => setActiveTab("inflatable")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === "inflatable"
            ? "text-[#009399] border-b-2 border-[#009399]"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {t("inflatable")}
        </button>
      </div>
      {products.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("image")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("productName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("priceSum")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("quantity")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("frame")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sizeDepth")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("tall")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => {
                const currentPrice = product.price * (1 - (product.discount || 0) / 100)
                const oldPrice = calculateOldPrice(product.price, product.discount)
                const imageUrl = product.image.startsWith("http") ? product.image : `${IMAGE_BASE_URL}${product.image}` // Construct full image URL

                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <Image
                        src={imageUrl || "/placeholder.svg"} // Use the constructed image URL
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">
                      {oldPrice && <span className="line-through text-gray-400 mr-2">{formatPrice(oldPrice)} сум</span>}
                      {formatPrice(currentPrice)} сум
                    </td>
                    <td className="px-6 py-4">{product.count}</td>
                    <td className="px-6 py-4">{product.frame}</td>
                    <td className="px-6 py-4">{product.size}</td>
                    <td className="px-6 py-4">{product.tall}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-gray-400 hover:text-blue-500"
                          onClick={() => showConfirmModal(product.id, "edit")}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => showConfirmModal(product.id, "delete")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex justify-center items-center py-4 bg-gray-50 border-t border-gray-200">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Go to previous page"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1 border rounded-md ${pageNumber === currentPage
                    ? "bg-[#009399] text-white border-[#009399]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Go to next page"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-600">
          <p className="text-lg">No products available for this category or search term.</p>
        </div>
      )}
      {isConfirmModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">
              {actionType === "edit" ? t("confirmEditProductTitle") : t("confirmDeleteProductTitle")}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {actionType === "edit" ? t("confirmEditProductMessage") : t("confirmDeleteProductMessage")}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {t("no")}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-[#009399] text-white rounded-md hover:bg-[#007a7f]"
              >
                {t("yes")}
              </button>
            </div>
          </div>
        </div>
      )}
      <AddProductModal isOpen={isAddModalVisible} onClose={handleAddModalClose} onProductAdded={handleProductAdded} />
    </div>
  )
}
