import { useTranslation } from "react-i18next";

const langs = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={
            "flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150 cursor-pointer " +
            (i18n.language === code
              ? "bg-sidebar-foreground text-sidebar font-medium"
              : "text-sidebar-foreground/50 hover:text-sidebar-foreground")
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
