"use client"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Modal, message } from "antd"
import { useLanguage } from "../service/language-contex"

type ProductItem = {
  id: string
  image: string
  price: string
  oldPrice?: string
  quantity: number
  frame: string
  size: string
  depth: number
}

const initialProductsData: ProductItem[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 10,
    frame: "Металлический",
    size: "2,7",
    depth: 60,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 7,
    frame: "Металлический",
    size: "3,5",
    depth: 76,
  },
  {
    id: "3",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 7,
    frame: "Металлический",
    size: "3,5",
    depth: 76,
  },
  {
    id: "4",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 10,
    frame: "Прямоугольная",
    size: "3.05 x 2.20",
    depth: 84,
  },
  {
    id: "5",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 10,
    frame: "Прямоугольная",
    size: "3.05 x 2.20",
    depth: 84,
  },
  {
    id: "6",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 10,
    frame: "Рамка призмы",
    size: "3.05",
    depth: 76,
  },
  {
    id: "7",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 10,
    frame: "Прямоугольная",
    size: "2 x 4",
    depth: 100,
  },
  {
    id: "8",
    image: "/placeholder.svg?height=40&width=40",
    price: "1.520.000",
    oldPrice: "1.800.000",
    quantity: 10,
    frame: "Рамka призмы",
    size: "3.05",
    depth: 76,
  },
]

export default function Product() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("frameType")
  const [products, setProducts] = useState<ProductItem[]>(initialProductsData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null)

  const showConfirmModal = (productId: string, type: "edit" | "delete") => {
    setSelectedProductId(productId)
    setActionType(type)
    setIsModalVisible(true)
  }

  const handleConfirm = () => {
    if (selectedProductId && actionType) {
      if (actionType === "delete") {
        setProducts(prev => prev.filter(p => p.id !== selectedProductId))
        message.success(t("productDeleted"))
      } else if (actionType === "edit") {
        const updatedProducts = products.map(product =>
          product.id === selectedProductId
            ? { ...product, price: "1.000.000 (edited)" }
            : product
        )
        setProducts(updatedProducts)
        message.success(t("productEdited"))
      }
    }
    setIsModalVisible(false)
    setSelectedProductId(null)
    setActionType(null)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedProductId(null)
    setActionType(null)
  }

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder={t("search")}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009398]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button className="bg-[#009398] text-white hover:bg-[#007a7f] transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-xl shadow-md">
          <Plus size={18} />
          <span>{t("addProduct")}</span>
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("frameType")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === "frameType" ? "text-[#009398] border-b-2 border-[#009398]" : "text-gray-500 hover:text-gray-700"}`}
        >
          {t("frameType")}
        </button>
        <button
          onClick={() => setActiveTab("inflatable")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === "inflatable" ? "text-[#009398] border-b-2 border-[#009398]" : "text-gray-500 hover:text-gray-700"}`}
        >
          {t("inflatable")}
        </button>
      </div>

      {activeTab === "frameType" && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("image")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("priceSum")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("quantity")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("frame")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("sizeDepth")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("depth")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <img src={product.image || "/placeholder.svg"} alt="Product" className="h-10 w-10 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    {product.oldPrice && <span className="line-through text-gray-400 mr-2">{product.oldPrice} сум</span>}
                    {product.price} сум
                  </td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.frame}</td>
                  <td className="px-6 py-4">{product.size}</td>
                  <td className="px-6 py-4">{product.depth}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-500" onClick={() => showConfirmModal(product.id, "edit")}>
                        <Pencil size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500" onClick={() => showConfirmModal(product.id, "delete")}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "inflatable" && (
        <div className="flex flex-col items-center justify-center h-full text-gray-600">
          <p className="text-lg">No inflatable products available yet.</p>
        </div>
      )}

      <Modal
        title={actionType === "edit" ? t("confirmEditProductTitle") : t("confirmDeleteProductTitle")}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={t("yes")}
        cancelText={t("no")}
        centered
      >
        <p>{actionType === "edit" ? t("confirmEditProductMessage") : t("confirmDeleteProductMessage")}</p>
      </Modal>
    </div>
  )
}