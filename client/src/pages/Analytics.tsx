import { HeaderDashboard } from "../components/layout/HeaderDashboard";

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
          <StatsAnalytics
            title="Total Expenses"
            amount="$1,234.56"
            pourcentage="10"
          />
          <StatsAnalytics
            title="Total Income"
            amount="$2,345.67"
            pourcentage="-5"
          />
          <StatsAnalytics
            title="Net Profit"
            amount="$1,111.11"
            pourcentage="15"
          />
          <StatsAnalytics
            title="Average Expense"
            amount="$123.45"
            pourcentage="0"
          />
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

function StatsAnalytics({
  title,
  amount,
}: {
  title: string;
  amount: string;
  pourcentage: string;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm text-muted-foreground">{title}</h2>
        <p className="font-semibold tabular-nums text-3xl">{amount}</p>
      </div>
    </div>
  );
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className="col-span-1 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="leading-none font-semibold">{title}</h2>
        </div>
      </div>
      {/* Chart component goes here */}
      <div className="mt-4 h-64 w-full flex items-center justify-center border-dashed border rounded-md">
        <p className="text-sm text-muted-foreground">
          Graph unavailable at this time
        </p>
      </div>
    </div>
  );
}

function PredictiveCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="col-span-1 rounded-xl border bg-card flex flex-col p-6 gap-4 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <h2 className="leading-none font-semibold">
          Predictions & Recommendations
        </h2>
      </div>

      {children ? (
        children
      ) : (
        <div className=" h-64 w-full flex items-center justify-center border-dashed border rounded-md">
          <p className="text-sm text-muted-foreground">
            No predictions available at this time.
          </p>
        </div>
      )}
    </div>
  );
}

function PredictiveMessage({
  type,
  title,
  description,
}: {
  type: "blue" | "yellow" | "green" | "purple" | "red";
  title: string;
  description: string;
}) {
  const config = {
    blue: {
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
    },
    yellow: {
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-500/20",
    },
    green: {
      bgColor: "bg-green-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
    },
    purple: {
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
    },
    red: {
      bgColor: "bg-red-500/10",
      iconColor: "text-red-500",
      borderColor: "border-red-500/20",
    },
  };

  const { bgColor, iconColor, borderColor } = config[type];

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg ${bgColor} border ${borderColor}`}
    >
      <h4 className={`font-semibold ${iconColor}`}>{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
