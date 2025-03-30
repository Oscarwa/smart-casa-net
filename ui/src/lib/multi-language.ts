import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { es } from "./translations/es";
import { en } from "./translations/en";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: { en, es },
});

export default i18n;
