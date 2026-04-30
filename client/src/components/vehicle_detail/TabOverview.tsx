import { useTranslation } from "react-i18next";
import { BlockCard } from "../layout/BlockCard";

export function TabOverview() {
  const { t } = useTranslation(["vehicle_detail"]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <BlockCard title={t("TabOverview.cost_block.title")} />
        <BlockCard title={t("TabOverview.fuel_block.title")} />
      </div>
      <BlockCard title={t("TabOverview.coming_maintenance_block.title")} />
    </div>
  );
}
