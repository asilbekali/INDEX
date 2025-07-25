"use client"

import { useState, useEffect } from "react"
import { Search, CheckCircle, Trash2 } from "lucide-react"
import { Modal, message } from "antd"
import { useLanguage } from "../service/language-contex"
import {
  getOrdersFromApi,
  updateOrderStatus,
  getConsultationsFromApi,
  updateConsultationStatus,
  deleteConsultationApi,
  deleteOrderApi,
} from "../api/userApi"

type OrderItem = {
  id: number
  userName: string
  userPhone: string
  userLocation: string
  createAt: string
  status: "active" | "NoActive"
  product: {
    id: number
    name: string
    image: string
    price: number
    size: number
  }
}

type Consultation = {
  data: {
    id: number
    name: string
    phone: string
    status: string
    createAt: string
  }[]
  lastPage: number
  page: number
  total: number
}

export default function OrdersPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"orders" | "consultations">("orders")
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisibleConsultation, setIsModalVisibleConsultation] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
  const [selectedConsultationId, setSelectedConsultationId] = useState<number | null>(null)
  const [actionType, setActionType] = useState<"accept" | "delete" | null>(null)
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [showContent, setShowContent] = useState(false) // New state for animation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetched = await getOrdersFromApi()
        setOrders(fetched)
      } catch (err: any) {
        message.error(err.message || t("failedToFetchOrders"))
      }
    }

    const fetchConsultations = async () => {
      try {
        const fetched = await getConsultationsFromApi()
        setConsultation(fetched)
      } catch (err: any) {
        message.error(err.message || t("failedToFetchConsultations"))
      }
    }

    // Fetch data for both tabs
    fetchConsultations()
    fetchOrders()

    // Trigger animation after a short delay to ensure content is mounted
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 100) // Adjust delay as needed for desired "slow show" effect

    return () => clearTimeout(timer)
  }, [t])

  const showConfirmModal = (orderId: number, type: "accept" | "delete") => {
    setSelectedOrderId(orderId)
    setActionType(type)
    setIsModalVisible(true)
  }

  const showConfirmModalConsultation = (consultationId: number, type: "accept" | "delete") => {
    setSelectedConsultationId(consultationId)
    setActionType(type)
    setIsModalVisibleConsultation(true)
  }

  const handleConfirm = async () => {
    if (selectedOrderId === null || !actionType) return
    try {
      if (actionType === "accept") {
        await updateOrderStatus(selectedOrderId.toString())
        setOrders((prev) =>
          prev.map((order) => (order.id === selectedOrderId ? { ...order, status: "NoActive" } : order)),
        )
        message.success(t("orderAccepted"))
      } else if (actionType === "delete") {
        await deleteOrderApi(selectedOrderId)
        setOrders((prev) => prev.filter((order) => order.id !== selectedOrderId))
        message.success(t("orderDeleted"))
      }
    } catch (err: any) {
      message.error(err.message || t("operationFailed"))
    } finally {
      setIsModalVisible(false)
      setSelectedOrderId(null)
      setActionType(null)
    }
  }

  const handleConfirmConsultation = async () => {
    if (selectedConsultationId === null || !actionType) return
    try {
      if (actionType === "accept") {
        await updateConsultationStatus(selectedConsultationId)
        setConsultation((prev) =>
          prev
            ? {
                ...prev,
                data: prev.data.map((item) =>
                  item.id === selectedConsultationId ? { ...item, status: "NoActive" } : item,
                ),
              }
            : null,
        )
        message.success(t("consultationAccepted"))
      } else if (actionType === "delete") {
        await deleteConsultationApi(selectedConsultationId)
        setConsultation((prev) =>
          prev ? { ...prev, data: prev.data.filter((item) => item.id !== selectedConsultationId) } : null,
        )
        message.success(t("consultationDeleted"))
      }
    } catch (err: any) {
      message.error(err.message || t("operationFailed"))
    } finally {
      setIsModalVisibleConsultation(false)
      setSelectedConsultationId(null)
      setActionType(null)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedOrderId(null)
    setActionType(null)
  }

  const handleCancelConsultation = () => {
    setIsModalVisibleConsultation(false)
    setSelectedConsultationId(null)
    setActionType(null)
  }

  const filteredOrders = orders.filter((order) => order.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col h-full p-6">
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009398] transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 hover:bg-gray-100 ${
            activeTab === "orders" ? "text-[#009398] border-b-2 border-[#009398]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("ordersTab")}
        </button>
        <button
          onClick={() => setActiveTab("consultations")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 hover:bg-gray-100 ${
            activeTab === "consultations"
              ? "text-[#009398] border-b-2 border-[#009398]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("consultationsTab")}
        </button>
      </div>
      {activeTab === "orders" && (
        <div
          className={`overflow-x-auto rounded-lg border border-gray-200 shadow-sm transition-all duration-500 ease-out ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("clientName")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("phone")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("image")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("sizeDepth")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("priceSum")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("address")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("time")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.userPhone}</td>
                  <td className="px-6 py-4 text-sm">
                    <img
                      src={order.product.image || "/placeholder.svg"}
                      alt="img"
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.product.size} cm</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.product.price.toLocaleString()} so'm</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.userLocation}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className={`transition-colors duration-200 transform hover:scale-110 ${
                          order.status === "NoActive" ? "text-green-500" : "text-gray-400 hover:text-green-500"
                        }`}
                        onClick={() => {
                          if (order.status !== "NoActive") {
                            showConfirmModal(order.id, "accept")
                          }
                        }}
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
                        onClick={() => showConfirmModal(order.id, "delete")}
                      >
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
      {activeTab === "consultations" && (
        <div
          className={`overflow-x-auto rounded-lg border border-gray-200 shadow-sm transition-all duration-500 ease-out ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {consultation ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("name")}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("phone")}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("status")}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("time")}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("actions")}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {consultation.data.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.createAt).toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className={`transition-colors duration-200 transform hover:scale-110 ${
                            item.status === "NoActive" ? "text-green-500" : "text-gray-400 hover:text-green-500"
                          }`}
                          onClick={() => {
                            if (item.status !== "NoActive") {
                              showConfirmModalConsultation(item.id, "accept")
                            }
                          }}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
                          onClick={() => showConfirmModalConsultation(item.id, "delete")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">{t("noConsultations")}</div>
          )}
        </div>
      )}
      <Modal
        title={actionType === "accept" ? t("confirmAccept") : t("confirmDelete")}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={t("confirm")}
        cancelText={t("cancel")}
        centered
        className="transition-all duration-300"
      >
        <p className="text-gray-700">
          {actionType === "accept" ? t("confirmAcceptMessage") : t("confirmDeleteMessage")}
        </p>
      </Modal>
      <Modal
        title={actionType === "accept" ? t("confirmAccept") : t("confirmDelete")}
        open={isModalVisibleConsultation}
        onOk={handleConfirmConsultation}
        onCancel={handleCancelConsultation}
        okText={t("confirm")}
        cancelText={t("cancel")}
        centered
        className="transition-all duration-300"
      >
        <p className="text-gray-700">
          {actionType === "accept" ? t("confirmAcceptMessage") : t("confirmDeleteMessage")}
        </p>
      </Modal>
    </div>
  )
}
