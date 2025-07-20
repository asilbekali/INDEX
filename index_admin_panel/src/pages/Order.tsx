"use client"

import { useState } from "react"
import { Search, CheckCircle, Trash2 } from "lucide-react"
import { Modal, message } from "antd"
import { useLanguage } from "../service/language-contex"

type OrderItem = {
  id: string
  clientName: string
  phone: string
  image: string
  size: string
  price: string
  address: string
  time: string
}

const initialOrdersData: OrderItem[] = [
  {
    id: "1",
    clientName: "Nodir",
    phone: "99 6071899",
    image: "/placeholder.svg?height=40&width=40",
    size: "2,7/60",
    price: "1.520.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "14:32 25.04.22",
  },
  {
    id: "2",
    clientName: "Otabek",
    phone: "95 1151533",
    image: "/placeholder.svg?height=40&width=40",
    size: "3,5/76",
    price: "2.920.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "19:45 25.04.22",
  },
  {
    id: "3",
    clientName: "Otabek",
    phone: "33 8008445",
    image: "/placeholder.svg?height=40&width=40",
    size: "3,5/76",
    price: "350.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "22:30 25.04.22",
  },
  {
    id: "4",
    clientName: "Aziz",
    phone: "97 7072256",
    image: "/placeholder.svg?height=40&width=40",
    size: "3.05 x 2.20/84",
    price: "1.200.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "14:32 25.04.22",
  },
  {
    id: "5",
    clientName: "Humoyun",
    phone: "94 4482555",
    image: "/placeholder.svg?height=40&width=40",
    size: "3.05 x 2.20/84",
    price: "5.580.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "14:32 25.04.22",
  },
  {
    id: "6",
    clientName: "Rustam",
    phone: "93 3333553",
    image: "/placeholder.svg?height=40&width=40",
    size: "3.05/76",
    price: "2.400.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "14:32 25.04.22",
  },
  {
    id: "7",
    clientName: "Elchin",
    phone: "97 0770588",
    image: "/placeholder.svg?height=40&width=40",
    size: "2 x 4/100",
    price: "1.550.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "14:32 25.04.22",
  },
  {
    id: "8",
    clientName: "Shermuhammad",
    phone: "98 4122351",
    image: "/placeholder.svg?height=40&width=40",
    size: "3.05/76",
    price: "1.620.000",
    address: "Yunusobod 15 Bog'ishamol ko'chasi 5-uy",
    time: "14:32 25.04.22",
  },
]

export default function OrdersPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("orders") 
  const [orders, setOrders] = useState<OrderItem[]>(initialOrdersData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [actionType, setActionType] = useState<"accept" | "delete" | null>(null)

  const showConfirmModal = (orderId: string, type: "accept" | "delete") => {
    setSelectedOrderId(orderId)
    setActionType(type)
    setIsModalVisible(true)
  }

  const handleConfirm = () => {
    if (selectedOrderId && actionType) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrderId))
      message.success(actionType === "accept" ? t("orderAccepted") : t("orderDeleted"))
    }
    setIsModalVisible(false)
    setSelectedOrderId(null)
    setActionType(null)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedOrderId(null)
    setActionType(null)
  }

  return (
    <div className="flex flex-col h-full p-6">
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder={t("search")}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009398]"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === "orders" ? "text-[#009398] border-b-2 border-[#009398]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("ordersTab")}
        </button>
        <button
          onClick={() => setActiveTab("consultations")}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
            activeTab === "consultations"
              ? "text-[#009398] border-b-2 border-[#009398]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("consultationsTab")}
        </button>
      </div>

      {activeTab === "orders" && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("clientName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("phone")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("image")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sizeDepthCm")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("priceSum")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("address")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("time")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img
                      src={order.image || "/placeholder.svg"}
                      alt="Product"
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-400 hover:text-green-500"
                        onClick={() => showConfirmModal(order.id, "accept")}
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500"
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
        <div className="flex flex-col items-center justify-center h-full text-gray-600">
          <p className="text-lg">{t("noConsultations")}</p>
        </div>
      )}

      <Modal
        title={actionType === "accept" ? t("confirmAcceptOrderTitle") : t("confirmDeleteOrderTitle")}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={t("yes")}
        cancelText={t("no")}
        centered
        wrapClassName="custom-modal-wrap" 
      >
        <p>{actionType === "accept" ? t("confirmAcceptOrderMessage") : t("confirmDeleteOrderMessage")}</p>
      </Modal>
    </div>
  )
}
