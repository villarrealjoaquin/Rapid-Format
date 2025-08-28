import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../public/dictionaries/en.json';
import esTranslations from '../public/dictionaries/es.json';

const resources = {
  en: {
    translation: enTranslations
  },
  es: {
    translation: esTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: []
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
