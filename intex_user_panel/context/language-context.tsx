"use client";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { translations } from "@/lib/translations";

type Language = keyof typeof translations; 
type TranslationKey = keyof typeof translations["ru"]; 

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("intex-language") as Language;
    if (savedLanguage === "ru" || savedLanguage === "uz") {
      setLanguageState(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("intex-language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  if (!isLoaded) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
