import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { PredictionCard } from "../components/analytics/PredictionCard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";
import Sidebar from "../components/layout/SideBar";
import { useTranslation, Trans } from "react-i18next";
import { ChartBarMultiple } from "../components/chart/chart-bar-multiple";
import { ChartLineDots } from "../components/chart/chart-line-dots";

export default function AnalyticsPage() {
  const { t } = useTranslation("analytics");

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        <HeaderDashboard
          title={t("title")}
          description={t("subtitle")}
          button={false}
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <MiniStatsCard title={t("stats.avg_cost_per_km")} amount="$0.42" />
          <MiniStatsCard title={t("stats.yearly_estimate")} amount="$6,240" />
          <MiniStatsCard title={t("stats.vs_average_user")} amount="+18%" />
          <MiniStatsCard title={t("stats.next_expense")} amount="7 days" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <BlockCard title={t("graphs_cost_per_km.title")}>
            <ChartLineDots />
          </BlockCard>
          <BlockCard title={t("graphs_monthly_trends.title")}>
            <ChartBarMultiple />
          </BlockCard>
        </div>

        <BlockCard title={t("predictions_block.title")}>
          <PredictionCard
            type="blue"
            title={t("predictions_block.messages.yearly_estimate.title")}
            description={
              <Trans
                i18nKey="predictions_block.messages.yearly_estimate.description"
                ns="analytics"
                values={{ amount: "$6,240" }}
                components={{ strong: <strong /> }}
              />
            }
          />
          <PredictionCard
            type="yellow"
            title={t("predictions_block.messages.next_expense.title")}
            description={
              <Trans
                i18nKey="predictions_block.messages.next_expense.description"
                ns="analytics"
                values={{ days: "7 days", km: "500 km", cost: "$180-$220" }}
                components={{ strong: <strong /> }}
              />
            }
          />
          <PredictionCard
            type="red"
            title={t("predictions_block.messages.above_average.title")}
            description={
              <Trans
                i18nKey="predictions_block.messages.above_average.description"
                ns="analytics"
                values={{ percentage: "18%" }}
                components={{ strong: <strong /> }}
              />
            }
          />
        </BlockCard>
      </div>
    </div>
  );
}
