import { useTranslation } from "react-i18next";
import { BlockCard } from "../layout/BlockCard";

export function TabMaintenance() {
  const { t } = useTranslation(["vehicle_detail"]);

  return (
    <div className="flex flex-col gap-6">
      <BlockCard title={t("TabMaintenance.schedule_block.title")} />
      <BlockCard title={t("TabMaintenance.history_block.title")} />
    </div>
  );
}
