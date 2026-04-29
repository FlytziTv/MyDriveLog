import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { PredictionCard } from "../components/analytics/PredictionCard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";

export default function AnalyticsPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="Analytics"
          description="Deep insights into your vehicle expenses"
          button={false}
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <MiniStatsCard title="Total Expenses" amount="$1,234.56" />
          <MiniStatsCard title="Total Income" amount="$2,345.67" />
          <MiniStatsCard title="Net Profit" amount="$1,111.11" />
          <MiniStatsCard title="Average Expense" amount="$123.45" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <BlockCard title="Cost per KM Evolution" />
          <BlockCard title="Monthly Trends by Category" />
        </div>

        <BlockCard title="Predictions & Recommendations">
          <PredictionCard
            type="blue"
            title="Estimated Yearly Cost"
            description={
              <>
                Based on your current spending patterns, your estimated yearly
                vehicle cost is <strong>$6,240</strong>. This includes fuel,
                maintenance, and insurance.
              </>
            }
          />
          <PredictionCard
            type="yellow"
            title="Next Expected Expense"
            description={
              <>
                Your next scheduled maintenance is due in approximately{" "}
                <strong>7 days</strong> or <strong>500 km</strong>. Estimated
                cost: $180-$220.
              </>
            }
          />
          <PredictionCard
            type="red"
            title="Above Average Spending"
            description={
              <>
                You're spending <strong>18% more</strong> than average users
                with similar vehicles. Consider reviewing your fuel efficiency
                and maintenance frequency.
              </>
            }
          />
        </BlockCard>
      </div>
    </div>
  );
}
