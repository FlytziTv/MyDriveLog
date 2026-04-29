import {
  Plus,
  TrendingDown,
  TrendingUp,
  TrendingUpDown,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="Dashboard"
          description="Track and analyze your vehicle expenses"
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <StatsCard
            title="Total Expenses"
            amount="$1,234.56"
            pourcentage="10"
          />
          <StatsCard title="Total Income" amount="$2,345.67" pourcentage="-5" />
          <StatsCard title="Net Profit" amount="$1,111.11" pourcentage="15" />
          <StatsCard title="Average Expense" amount="$123.45" pourcentage="0" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ChartCard title="Expenses Over Time" description="Last 30 days" />
          <ChartCard title="Expense Breakdown" description="By category" />
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

function HeaderDashboard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <button className="bg-primary text-primary-foreground flex flex-row items-center justify-center gap-2 text-sm hover:bg-primary/80 px-4 py-2 rounded-md transition-colors duration-200">
        <Plus size={16} />
        Add Expense
      </button>
    </div>
  );
}

function StatsCard({
  title,
  amount,
  pourcentage,
}: {
  title: string;
  amount: string;
  pourcentage: string;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-muted-foreground">{title}</h2>
          <p className="font-semibold tabular-nums text-3xl">{amount}</p>
        </div>
        <PourcentageCard pourcentage={pourcentage} />
      </div>
    </div>
  );
}

function PourcentageCard({ pourcentage }: { pourcentage: string }) {
  const Icon =
    pourcentage > "0"
      ? TrendingUp
      : pourcentage < "0"
        ? TrendingDown
        : TrendingUpDown;

  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 border-border text-foreground ">
      <Icon size={12} />
      {pourcentage}%
    </span>
  );
}

function ChartCard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="col-span-1 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="leading-none font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
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

interface InsightCardProps {
  type: "info" | "warning" | "success" | "tip";
  title: string;
  description: string;
}

export function InsightCard({ type, title, description }: InsightCardProps) {
  const config = {
    info: {
      icon: AlertCircle,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-500/20",
    },
    success: {
      icon: TrendingUp,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
    },
    tip: {
      icon: Lightbulb,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
    },
  };

  const { icon: Icon, bgColor, iconColor, borderColor } = config[type];

  return (
    <div
      className={`col-span-1 rounded-xl border bg-card p-4 text-card-foreground flex flex-row gap-4 ${borderColor}`}
    >
      <div>
        <div
          className={`shrink-0 aspect-square p-2 rounded-md flex items-center justify-center ${bgColor}`}
        >
          <Icon className={`text-primary ${iconColor}`} size={16} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="leading-none font-semibold">{title}</h2>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
