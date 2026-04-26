/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F7396",
        "primary-light": "#EEF3F8",
        "app-border": "#E8E8F0",
        "app-text": "#1A1A2E",
        "app-muted": "#6B7280",
        "app-bg": "#FAFAFA",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.06)",
        card: "0 4px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
