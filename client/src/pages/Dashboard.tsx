import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { InsightCard } from "../components/dashboard/InsightCard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";

export default function DashboardPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="Dashboard"
          description="Track and analyze your vehicle expenses"
          buttonText="Add Expense"
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <MiniStatsCard
            title="Total Expenses"
            amount="$1,234.56"
            pourcentage="10"
          />
          <MiniStatsCard
            title="Total Income"
            amount="$2,345.67"
            pourcentage="-5"
          />
          <MiniStatsCard
            title="Net Profit"
            amount="$1,111.11"
            pourcentage="15"
          />
          <MiniStatsCard
            title="Average Expense"
            amount="$123.45"
            pourcentage="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <BlockCard title="Expenses Over Time" description="Last 30 days" />
          <BlockCard title="Expense Breakdown" description="By category" />
        </div>

        <div className="w-full flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Smart Insights</h2>
          <div className="grid grid-cols-2 gap-4">
            <InsightCard
              type="warning"
              title="Expenses increased by 20%"
              description="Your expenses this month are higher than your 6-month average. Review recent transactions."
            />
            <InsightCard
              type="info"
              title="Maintenance due soon"
              description="Your vehicle is approaching 15,000 km. Schedule an oil change within the next 500 km."
            />
            <InsightCard
              type="success"
              title="Fuel efficiency improving"
              description="Your cost per kilometer has decreased by 8% compared to last month."
            />
            <InsightCard
              type="tip"
              title="Cost optimization tip"
              description="Consider switching to premium gas stations less frequently to save approximately $45/month."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
