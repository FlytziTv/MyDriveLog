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
      bg: "bg-blue-50 border-blue-200 hover:shadow-blue-100",
      iconWrap: "bg-blue-100 text-blue-600",
      dot: "bg-blue-500",
      title: "text-blue-900",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-amber-50 border-amber-200 hover:shadow-amber-100",
      iconWrap: "bg-amber-100 text-amber-600",
      dot: "bg-amber-500",
      title: "text-amber-900",
    },
    success: {
      icon: TrendingUp,
      bg: "bg-green-50 border-green-200 hover:shadow-green-100",
      iconWrap: "bg-green-100 text-green-600",
      dot: "bg-green-500",
      title: "text-green-900",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-purple-50 border-purple-200 hover:shadow-purple-100",
      iconWrap: "bg-purple-100 text-purple-600",
      dot: "bg-purple-500",
      title: "text-purple-900",
    },
  };

  const { icon: Icon, bg, iconWrap, dot, title: titleColor } = config[type];

  return (
    <div
      className={`relative col-span-1 rounded-xl border px-5 py-4.5 flex flex-row gap-3.5 items-start overflow-hidden
        transition-all duration-200 cursor-default ${bg}`}
    >
      <span
        className={`absolute top-3.5 right-4 rounded-full ${dot}`}
        style={{ width: "7px", height: "7px" }}
      />

      <div
        className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${iconWrap}`}
      >
        <Icon size={17} />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className={`text-sm font-semibold leading-snug ${titleColor}`}>
          {title}
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
