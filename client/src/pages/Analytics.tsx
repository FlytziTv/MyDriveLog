import { ChartCard } from "../components/analytics/ChartCard";
import { StatsAnalytics } from "../components/analytics/StatsAnalytics";
import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import {
  PredictiveCard,
  PredictiveMessage,
} from "../components/analytics/PredictiveCard";

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
          <StatsAnalytics title="Total Expenses" amount="$1,234.56" />
          <StatsAnalytics title="Total Income" amount="$2,345.67" />
          <StatsAnalytics title="Net Profit" amount="$1,111.11" />
          <StatsAnalytics title="Average Expense" amount="$123.45" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ChartCard title="Cost per KM Evolution" />
          <ChartCard title="Monthly Trends by Category" />
        </div>

        <PredictiveCard>
          <PredictiveMessage
            type="blue"
            title="Estimated Yearly Cost"
            description="Based on your current spending patterns, your estimated yearly vehicle cost is $6,240. This includes fuel, maintenance, and insurance."
          />
          <PredictiveMessage
            type="yellow"
            title="Next Expected Expense"
            description="Your next scheduled maintenance is due in approximately 7 days or 500 km. Estimated cost: $180-$220."
          />
          <PredictiveMessage
            type="red"
            title="Above Average Spending"
            description="You're spending 18% more than average users with similar vehicles. Consider reviewing your fuel efficiency and maintenance frequency."
          />
        </PredictiveCard>
      </div>
    </div>
  );
}
