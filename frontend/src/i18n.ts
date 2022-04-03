import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/locales/{{ns}}/{{lng}}.json',
        },
        fallbackLng: 'pl',
        debug: false,
        ns: ['common'],
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
    });

export default i18n;
