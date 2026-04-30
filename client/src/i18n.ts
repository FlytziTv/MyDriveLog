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

import enAnalytics from "./locales/en/analytics.json";
import frAnalytics from "./locales/fr/analytics.json";
import ptAnalytics from "./locales/pt/analytics.json";

import enMaintenance from "./locales/en/maintenance.json";
import frMaintenance from "./locales/fr/maintenance.json";
import ptMaintenance from "./locales/pt/maintenance.json";

import enDocuments from "./locales/en/documents.json";
import frDocuments from "./locales/fr/documents.json";
import ptDocuments from "./locales/pt/documents.json";

import enDialog from "./locales/en/dialogs.json";
import frDialog from "./locales/fr/dialogs.json";
import ptDialog from "./locales/pt/dialogs.json";

import enVehicleDetail from "./locales/en/vehicle_detail.json";
import frVehicleDetail from "./locales/fr/vehicle_detail.json";
import ptVehicleDetail from "./locales/pt/vehicle_detail.json";

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
        analytics: enAnalytics,
        maintenance: enMaintenance,
        documents: enDocuments,
        dialog: enDialog,
        vehicle_detail: enVehicleDetail,
      },
      fr: {
        common: frCommon,
        login: frLogin,
        register: frRegister,
        dashboard: frDashboard,
        vehicles: frVehicles,
        analytics: frAnalytics,
        maintenance: frMaintenance,
        documents: frDocuments,
        dialog: frDialog,
        vehicle_detail: frVehicleDetail,
      },
      pt: {
        common: ptCommon,
        login: ptLogin,
        register: ptRegister,
        dashboard: ptDashboard,
        vehicles: ptVehicles,
        analytics: ptAnalytics,
        maintenance: ptMaintenance,
        documents: ptDocuments,
        dialog: ptDialog,
        vehicle_detail: ptVehicleDetail,
      },
    },
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
