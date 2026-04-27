/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Couleur principales
        primary: "#3E6A8E",
        "primary-hover": "#345A78",
        "primary-light": "#EEF4F8",

        // Backgrounds
        "app-bg": "#F6F8FB",
        "card-bg": "#FFFFFF",

        // Textes
        "app-text": "#0F172A",
        "app-muted": "#64748B",
        "app-subtle": "#94A3B8",

        // Bordures
        "app-border": "#E2E8F0",

        // États
        success: "#22C55E", // entretien OK
        warning: "#F59E0B", // bientôt à faire
        danger: "#EF4444", // urgent

        // Dépenses (utile pour charts)
        "expense-fuel": "#3B82F6",
        "expense-maintenance": "#F59E0B",
        "expense-other": "#A78BFA",

        // Surfaces secondaires
        "surface-soft": "#F1F5F9",
        "surface-hover": "#E9EEF5",
      },

      boxShadow: {
        soft: "0 2px 10px rgba(15, 23, 42, 0.04)",
        card: "0 6px 24px rgba(15, 23, 42, 0.06)",
        hover: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
