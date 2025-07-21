"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "../service/language-contex"
import { useToast } from "../hooks/use-toaster"
import { addProductApi } from "../api/userApi"

type AddProductModalProps = {
  isOpen: boolean
  onClose: () => void
  onProductAdded: () => void
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const { t } = useLanguage()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0,
    frame: "square", // Default to square
    size: 0,
    status: "new", // Default status
    count: 0,
    discount: 0,
    tall: 0,
    categoryId: 1, // Default category
  })
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addProductApi(formData)
      toast({ title: "Success", description: t("productAdded") })
      onProductAdded() // Trigger refresh of product list
      onClose() // Close modal
      setFormData({
        // Reset form
        name: "",
        image: "",
        price: 0,
        frame: "square",
        size: 0,
        status: "new",
        count: 0,
        discount: 0,
        tall: 0,
        categoryId: 1,
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to add product",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">{t("addNewProduct")}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t("addProductName")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              {t("addProductImage")}
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              {t("addProductPrice")}
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="count" className="block text-sm font-medium text-gray-700">
              {t("addProductQuantity")}
            </label>
            <input
              type="number"
              id="count"
              name="count"
              value={formData.count}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="frame" className="block text-sm font-medium text-gray-700">
              {t("addProductFrame")}
            </label>
            <select
              id="frame"
              name="frame"
              value={formData.frame}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
              {t("addProductSize")}
            </label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="tall" className="block text-sm font-medium text-gray-700">
              {t("addProductTall")}
            </label>
            <input
              type="number"
              id="tall"
              name="tall"
              value={formData.tall}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              {t("addProductCategory")}
            </label>
            <input
              type="number"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              {t("addProductDiscount")}
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#009399] focus:border-[#009399]"
            />
          </div>
          {/* Add other fields as necessary */}
          <div className="col-span-2 flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#009399] text-white rounded-md hover:bg-[#007a7f] disabled:opacity-50"
            >
              {loading ? "Saving..." : t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
