import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import frCommon from "./locales/fr/common.json";
import ptCommon from "./locales/pt/common.json";

import enLogin from "./locales/en/login.json";
import frLogin from "./locales/fr/login.json";
import ptLogin from "./locales/pt/login.json";

import enRegister from "./locales/en/register.json";
import frRegister from "./locales/fr/register.json";
import ptRegister from "./locales/pt/register.json";

import enDashboard from "./locales/en/dashboard.json";
import frDashboard from "./locales/fr/dashboard.json";
import ptDashboard from "./locales/pt/dashboard.json";

import enVehicles from "./locales/en/vehicles.json";
import frVehicles from "./locales/fr/vehicles.json";
import ptVehicles from "./locales/pt/vehicles.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        login: enLogin,
        register: enRegister,
        dashboard: enDashboard,
        vehicles: enVehicles,
      },
      fr: {
        common: frCommon,
        login: frLogin,
        register: frRegister,
        dashboard: frDashboard,
        vehicles: frVehicles,
      },
      pt: {
        common: ptCommon,
        login: ptLogin,
        register: ptRegister,
        dashboard: ptDashboard,
        vehicles: ptVehicles,
      },
    },
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
