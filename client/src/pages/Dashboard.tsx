import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogContent from "../components/layout/DialogContent";
import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { InsightCard } from "../components/dashboard/InsightCard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";
import Sidebar from "../components/layout/SideBar";
import { useTranslation } from "react-i18next";
import { AddExpenseForm } from "../components/dialog/add/expense-form";
import { ChartLineDots } from "../components/chart/chart-line-dots";
import { ChartPieLegend } from "../components/chart/chart-pie-legend";

export default function DashboardPage() {
  const { t } = useTranslation(["dashboard", "dialog"]);
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <HeaderDashboard
            title={t("title")}
            description={t("subtitle")}
            buttonText={t("button")}
            onButtonClick={() => setOpen(true)}
          />
          <div className="w-full grid grid-cols-4 gap-4">
            <MiniStatsCard
              title={t("stats.total_expenses")}
              amount="$1,234.56"
              pourcentage="10"
            />
            <MiniStatsCard
              title={t("stats.total_income")}
              amount="$2,345.67"
              pourcentage="-5"
            />
            <MiniStatsCard
              title={t("stats.net_profit")}
              amount="$1,111.11"
              pourcentage="15"
            />
            <MiniStatsCard
              title={t("stats.average_expense")}
              amount="$123.45"
              pourcentage="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <BlockCard
              title={t("graphs_overview.title")}
              description={t("graphs_overview.description")}
            >
              <ChartLineDots />
            </BlockCard>
            <BlockCard
              title={t("graphs_category.title")}
              description={t("graphs_category.description")}
            >
              <ChartPieLegend />
            </BlockCard>
          </div>

          <div className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{t("smart_insights")}</h2>
            <div className="grid grid-cols-2 gap-4">
              <InsightCard
                type="warning"
                title={t("smart_messages.expense.title")}
                description={t("smart_messages.expense.description")}
              />
              <InsightCard
                type="info"
                title={t("smart_messages.maintenance.title")}
                description={t("smart_messages.maintenance.description")}
              />
              <InsightCard
                type="success"
                title={t("smart_messages.fuel_efficiency.title")}
                description={t("smart_messages.fuel_efficiency.description")}
              />
              <InsightCard
                type="tip"
                title={t("smart_messages.optimization.title")}
                description={t("smart_messages.optimization.description")}
              />
            </div>
          </div>
          <DialogContent title={t("dialog:add_expense.title")}>
            <AddExpenseForm
              onSuccess={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog.Root>
      </div>
    </div>
  );
}
