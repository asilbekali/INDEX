"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Modal, message } from "antd"
import { useLanguage } from "../service/language-contex" // Assuming this path is correct

type CategoryItem = {
  id: string
  name: string // Russian name
  uzbekName: string // Uzbek name
}

const initialCategoriesData: CategoryItem[] = [
  {
    id: "1",
    name: "Каркасные",
    uzbekName: "Karkasli",
  },
  {
    id: "2",
    name: "Надувные",
    uzbekName: "Shishiriladigan",
  },
]

export default function Category() {
  // Placeholder for language context, assuming it provides a 't' function
  const { t } = useLanguage() || {
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        addCategory: "Добавить категории",
        name: "Название",
        uzbekName: "На узбекском",
        actions: "Действия",
        confirmEditCategoryTitle: "Подтвердить изменение категории",
        confirmDeleteCategoryTitle: "Подтвердить удаление категории",
        confirmEditCategoryMessage: "Вы уверены, что хотите изменить эту категорию?",
        confirmDeleteCategoryMessage: "Вы уверены, что хотите удалить эту категорию?",
        yes: "Да",
        no: "Нет",
        categoryEdited: "Категория успешно изменена!",
        categoryDeleted: "Категория успешно удалена!",
      }
      return translations[key] || key // Fallback to key if translation not found
    },
  }

  const [categories, setCategories] = useState<CategoryItem[]>(initialCategoriesData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null)

  const showConfirmModal = (categoryId: string, type: "edit" | "delete") => {
    setSelectedCategoryId(categoryId)
    setActionType(type)
    setIsModalVisible(true)
  }

  const handleConfirm = () => {
    if (selectedCategoryId && actionType) {
      if (actionType === "delete") {
        setCategories((prev) => prev.filter((c) => c.id !== selectedCategoryId))
        message.success(t("categoryDeleted"))
      } else if (actionType === "edit") {
        // For demonstration, we'll just change the name slightly
        const updatedCategories = categories.map((category) =>
          category.id === selectedCategoryId ? { ...category, name: `${category.name} (изменено)` } : category,
        )
        setCategories(updatedCategories)
        message.success(t("categoryEdited"))
      }
    }
    setIsModalVisible(false)
    setSelectedCategoryId(null)
    setActionType(null)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedCategoryId(null)
    setActionType(null)
  }

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100">
      <div className="flex justify-end mb-6">
        <button className="bg-[#009398] text-white hover:bg-[#007a7f] transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-xl shadow-md">
          <Plus size={18} />
          <span>{t("addCategory")}</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Header Row */}
        <div className="grid grid-cols-[2fr_2fr_1fr] items-center bg-white rounded-xl p-4 shadow-sm font-semibold text-gray-500">
          <div>{t("name")}</div>
          <div>{t("uzbekName")}</div>
          <div className="text-right">{t("actions")}</div>
        </div>

        {/* Category Items */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="grid grid-cols-[2fr_2fr_1fr] items-center bg-white rounded-xl p-4 shadow-sm"
          >
            <div>{category.name}</div>
            <div>{category.uzbekName}</div>
            <div className="flex items-center justify-end space-x-2">
              <button
                className="text-gray-400 hover:text-blue-500"
                onClick={() => showConfirmModal(category.id, "edit")}
              >
                <Pencil size={18} />
              </button>
              <button
                className="text-gray-400 hover:text-red-500"
                onClick={() => showConfirmModal(category.id, "delete")}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal
        title={actionType === "edit" ? t("confirmEditCategoryTitle") : t("confirmDeleteCategoryTitle")}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={t("yes")}
        cancelText={t("no")}
        centered
      >
        <p>{actionType === "edit" ? t("confirmEditCategoryMessage") : t("confirmDeleteCategoryMessage")}</p>
      </Modal>
    </div>
  )
}
