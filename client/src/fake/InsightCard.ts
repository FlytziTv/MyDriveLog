import { useTranslation } from "react-i18next";

interface InsightCard {
  id: number;
  type: "info" | "warning" | "success" | "tip";
  title: string;
  description: string;
}

export const useFakeInsightCard = (): InsightCard[] => {
  const { t } = useTranslation(["dashboard"]);

  return [
    {
      id: 1,
      type: "warning",
      title: t("smart_messages.expense.title"),
      description: t("smart_messages.expense.description"),
    },
    {
      id: 2,
      type: "info",
      title: t("smart_messages.maintenance.title"),
      description: t("smart_messages.maintenance.description"),
    },
    {
      id: 3,
      type: "success",
      title: t("smart_messages.fuel_efficiency.title"),
      description: t("smart_messages.fuel_efficiency.description"),
    },
    {
      id: 4,
      type: "tip",
      title: t("smart_messages.optimization.title"),
      description: t("smart_messages.optimization.description"),
    },
  ];
};
