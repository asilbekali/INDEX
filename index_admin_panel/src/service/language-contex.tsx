"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define language types
export const languages = {
  en: { code: "en", name: "English", flag: "🇬🇧" },
  uz: { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  ru: { code: "ru", name: "Русский", flag: "🇷🇺" },
} as const

type LanguageCode = keyof typeof languages

type LanguageContextType = {
  t: (key: string) => string
  currentLanguage: LanguageCode
  setLanguage: (lang: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("uz")

  const t = (key: string) => {
    const translations: Record<LanguageCode, Record<string, string>> = {
      en: {
        products: "Products",
        orders: "Orders",
        categories: "Categories",
        website: "Website",
        title: "INTEX-MARKET.UZ",
        viewWebsite: "View Website",
        adminProfile: "Admin Profile",
        name: "Name",
        email: "Email",
        clientName: "Client Name",
        phone: "Phone",
        image: "Image",
        sizeDepth: "Size(m)/Depth(cm)",
        priceSum: "Price(sum)",
        address: "Address",
        time: "Time",
        actions: "Actions",
        search: "Search",
        ordersTab: "Orders",
        consultationsTab: "Consultations",
        noConsultations: "No consultations available yet.",
        addProduct: "Add Product",
        frame: "Frame",
        quantity: "Quantity",
        frameType: "Frame Type",
        inflatable: "Inflatable",
        depth: "Depth",
        productName: "Product Name",
        tall: "Tall",
        productDeleted: "Product successfully deleted!",
        productEdited: "Product successfully edited!",
        productAdded: "Product successfully added!", // Added translation
        confirmEditProductTitle: "Confirm Edit",
        confirmEditProductMessage: "Are you sure you want to edit this product?",
        confirmDeleteProductTitle: "Confirm Delete",
        confirmDeleteProductMessage: "Are you sure you want to delete this product? This action cannot be undone.",
        yes: "Yes",
        no: "No",
      },
      uz: {
        products: "Mahsulotlar",
        orders: "Buyurtmalar",
        categories: "Kategoriyalar",
        website: "Veb-sayt",
        title: "INTEX-MARKET.UZ",
        viewWebsite: "Veb-saytni ko'rish",
        adminProfile: "Admin Profili",
        name: "Ism",
        email: "Elektron pochta",
        clientName: "Mijoz nomi",
        phone: "Telefon",
        image: "Rasm",
        sizeDepth: "O'lcham(m)/Chuqurlik(sm)",
        priceSum: "Narxi(so'm)",
        address: "Manzil",
        time: "Vaqt",
        actions: "Harakatlar",
        search: "Qidirish",
        ordersTab: "Buyurtmalar",
        consultationsTab: "Konsultatsiyalar",
        noConsultations: "Hozircha konsultatsiyalar mavjud emas.",
        addProduct: "Mahsulot qo'shish",
        frame: "Ramka",
        quantity: "Miqdor",
        frameType: "Karkasli",
        inflatable: "Puflanadigan",
        depth: "Chuqurlik",
        productName: "Mahsulot nomi",
        tall: "Bo'yi",
        productDeleted: "Mahsulot muvaffaqiyatli o'chirildi!",
        productEdited: "Mahsulot muvaffaqiyatli o'zgartirildi!",
        productAdded: "Mahsulot muvaffaqiyatli qo'shildi!", // Added translation
        confirmEditProductTitle: "O'zgartirishni tasdiqlash",
        confirmEditProductMessage: "Ushbu mahsulotni o'zgartirmoqchimisiz?",
        confirmDeleteProductTitle: "O'chirishni tasdiqlash",
        confirmDeleteProductMessage: "Ushbu mahsulotni o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.",
        yes: "Ha",
        no: "Yo'q",
      },
      ru: {
        products: "Продукты",
        orders: "Заказы",
        categories: "Категории",
        website: "Веб-сайт",
        title: "INTEX-MARKET.UZ",
        viewWebsite: "Просмотр веб-сайта",
        adminProfile: "Профиль администратора",
        name: "Имя",
        email: "Электронная почта",
        clientName: "Имя клиента",
        phone: "Телефон",
        image: "Изображение",
        sizeDepth: "Размер(м)/Глубина(см)",
        priceSum: "Цена(сум)",
        address: "Адрес",
        time: "Время",
        actions: "Действия",
        search: "Найти",
        ordersTab: "Заказы",
        consultationsTab: "Консультации",
        noConsultations: "Консультаций пока нет.",
        addProduct: "Добавить продукт",
        frame: "Рамка",
        quantity: "Количество",
        frameType: "Каркасные",
        inflatable: "Надувные",
        depth: "Глубина",
        productName: "Название продукта",
        tall: "Высота",
        productDeleted: "Продукт успешно удален!",
        productEdited: "Продукт успешно изменен!",
        productAdded: "Продукт успешно добавлен!", // Added translation
        confirmEditProductTitle: "Подтвердить изменение",
        confirmEditProductMessage: "Вы уверены, что хотите изменить этот продукт?",
        confirmDeleteProductTitle: "Подтвердить удаление",
        confirmDeleteProductMessage: "Вы уверены, что хотите удалить этот продукт? Это действие необратимо.",
        yes: "Да",
        no: "Нет",
      },
    }
    return translations[currentLanguage][key] || key
  }

  return (
    <LanguageContext.Provider value={{ t, currentLanguage, setLanguage: setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
