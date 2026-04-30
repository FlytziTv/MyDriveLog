import { useTranslation } from "react-i18next";
import { BlockCard } from "../layout/BlockCard";

export function TabExpenses() {
  const { t } = useTranslation(["vehicle_detail"]);
  return (
    <div className="flex flex-col gap-6">
      <BlockCard title={t("TabExpenses.history_block.title")} />
    </div>
  );
}
