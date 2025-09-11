import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Language configurations with RTL support
export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
  { code: 'bn', name: 'বাংলা', dir: 'ltr' }
];

const savedLanguage = localStorage.getItem('language');

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: savedLanguage || undefined, // Use saved language or let detector handle it
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
    
    react: {
      useSuspense: false,
    }
  });

// Set document direction and language
i18n.on('languageChanged', (lng) => {
  const language = languages.find(lang => lang.code === lng);
  if (language) {
    document.documentElement.dir = language.dir;
    document.documentElement.lang = lng;
    localStorage.setItem('language', lng);
  }
});

// Set initial direction
const currentLanguage = languages.find(lang => lang.code === i18n.language);
if (currentLanguage) {
  document.documentElement.dir = currentLanguage.dir;
  document.documentElement.lang = i18n.language;
}

export default i18n;