import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import vi from "./vi/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
