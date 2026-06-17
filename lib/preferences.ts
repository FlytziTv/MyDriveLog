const pref_unit = [
  { value: "KM", label: "Kilomètres" },
  { value: "MILES", label: "Miles" },
];

const pref_devise = [
  { value: "EUR", label: "€ Euro" },
  { value: "USD", label: "$ Dollar" },
  { value: "GBP", label: "£ Livre" },
];

const pref_langue = [
  { value: "FR", label: "Français" },
  { value: "EN", label: "English" },
  { value: "ES", label: "Español" },
  { value: "DE", label: "Deutsch" },
];

const pref_theme = [
  { value: "LIGHT", label: "Clair" },
  { value: "DARK", label: "Sombre" },
  { value: "SYSTEM", label: "Système" },
];

const reminder_periods = [
  { value: "SEVEN_DAYS", label: "7 jours" },
  { value: "FOURTEEN_DAYS", label: "14 jours" },
  { value: "ONE_MONTH", label: "1 mois" },
];

const notif_preferences = [
  {
    group: "Alertes véhicule",
    context: [
      {
        title: "Rappels entretien",
        description: "Alerte avant échéance de révision",
        key: "notifMaintenanceReminder" as const,
      },
      {
        title: "Alertes kilométrage",
        description: "Notification au seuil programmé",
        key: "notifMileageAlert" as const,
      },
    ],
  },
  {
    group: "Informations",
    context: [
      {
        title: "Résumé mensuel",
        description: "Récapitulatif de vos dépenses",
        key: "notifMonthlySummary" as const,
      },
      {
        title: "Nouveautés MyDriveLog",
        description: "Nouvelles fonctionnalités et mises à jour",
        key: "notifNews" as const,
      },
    ],
  },
];

export {
  pref_unit,
  pref_devise,
  pref_langue,
  pref_theme,
  reminder_periods,
  notif_preferences,
};
