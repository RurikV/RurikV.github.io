import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      // Header
      courts: 'Courts',
      booking: 'Booking',
      profile: 'Profile',
      // Modal Demo
      modal_demo_title: 'Modal Demo',
      modal_demo_input_label: 'Enter text to display in modal window:',
      modal_demo_input_placeholder: 'Enter text here...',
      modal_demo_button: 'Open Modal Window',
      modal_content_title: 'Modal Window Content',
      modal_no_text: 'No text entered',
      // App
      app_text: 'Write text here',
    },
  },
  ru: {
    translation: {
      // Common
      language: 'Язык',
      theme: 'Тема',
      light: 'Светлая',
      dark: 'Темная',
      // Header
      courts: 'Корты',
      booking: 'Бронирование',
      profile: 'Профиль',
      // Modal Demo
      modal_demo_title: 'Демо модального окна',
      modal_demo_input_label: 'Введите текст для отображения в модальном окне:',
      modal_demo_input_placeholder: 'Введите текст здесь...',
      modal_demo_button: 'Открыть модальное окно',
      modal_content_title: 'Содержимое модального окна',
      modal_no_text: 'Текст не введен',
      // App
      app_text: 'Текст писать тут',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
