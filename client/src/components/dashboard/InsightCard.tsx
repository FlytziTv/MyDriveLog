import {
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

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
