// src/utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    debug: true, // Turn this on to see console logs
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Important!
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    }
  });

// Set initial font based on detected/fallback language
const setInitialFont = () => {
  const currentLang = i18n.language || 'ar';
  const rootElement = document.documentElement;
  
  rootElement.lang = currentLang;
  rootElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  
  if (currentLang === 'ar') {
    rootElement.style.setProperty('--active-font', '"El Messiri", sans-serif');
    document.body.style.fontFamily = '"El Messiri", sans-serif';
  } else {
    rootElement.style.setProperty('--active-font', '"Poppins", sans-serif');
    document.body.style.fontFamily = '"Poppins", sans-serif';
  }
};

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  const rootElement = document.documentElement;
  
  rootElement.lang = lng;
  rootElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  
  if (lng === 'ar') {
    rootElement.style.setProperty('--active-font', '"El Messiri", sans-serif');
    document.body.style.fontFamily = '"El Messiri", sans-serif';
  } else {
    rootElement.style.setProperty('--active-font', '"Poppins", sans-serif');
    document.body.style.fontFamily = '"Poppins", sans-serif';
  }
});

// Set font after i18n is initialized
i18n.on('initialized', () => {
  setInitialFont();
});

export default i18n;