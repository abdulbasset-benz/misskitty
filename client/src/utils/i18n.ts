// src/utils/i18n.ts (or wherever you put it)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // Turn this on to see console logs
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Important!
    },
    
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
