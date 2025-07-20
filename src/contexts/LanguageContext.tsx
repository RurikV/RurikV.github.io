import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  // Normalize language code to handle cases like 'en-US' -> 'en'
  const normalizeLanguage = (lang: string): Language => {
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('ru')) return 'ru';
    return 'en'; // fallback
  };

  const value = {
    language: normalizeLanguage(i18n.language),
    changeLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
