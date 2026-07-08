import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import frCommon from './locales/fr/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
    },
    es: {
      common: esCommon,
    },
    fr: {
      common: frCommon,
    },
  },
  ns: ['common'],
  defaultNS: 'common',
  fallbackLng: 'en',
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

export default i18n;
