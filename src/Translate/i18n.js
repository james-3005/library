import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import English from './en.json'
import VietNam from './vi.json'

const resources = {
    en: {
        translation: English
    },
    vi: {
        translation: VietNam
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }

    });
export default i18n;