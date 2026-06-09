// Preference profil -> Preferences

const pref_unit = [
  { value: "km", label: "Kilomètres" },
  { value: "mi", label: "Miles" },
];

const pref_devise = [
  { value: "EUR", label: "€ Euro" },
  { value: "USD", label: "$ Dollar" },
  { value: "GBP", label: "£ Livre" },
];

const pref_langue = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
];

const pref_theme = [
  { value: "light", label: "Clair" },
  { value: "dark", label: "Sombre" },
  { value: "system", label: "Système" },
];

// Preference Notifications -> Notifications

const notif_preferences = [
  {
    group: "Alertes véhicule",
    context: [
      {
        title: "Rappels entretien",
        description: "Alerte avant échéance de révision",
      },
      {
        title: "Alertes kilométrage",
        description: "Notification au seuil programmé",
      },
    ],
  },
  {
    group: "Informations",
    context: [
      {
        title: "Résumé mensuel",
        description: "Récapitulatif de vos dépenses",
      },
      {
        title: "Nouveautés MyDriveLog",
        description: "Nouvelles fonctionnalités et mises à jour",
      },
    ],
  },
];

export { pref_unit, pref_devise, pref_langue, pref_theme, notif_preferences };
