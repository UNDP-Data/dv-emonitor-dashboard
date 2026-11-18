import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
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
