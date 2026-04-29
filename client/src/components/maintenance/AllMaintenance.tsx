import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Gauge,
} from "lucide-react";

export function AllMaintenance({
  status,
  task,
  vehicle,
  dueDate,
  dueMileage,
  estimatedCost,
}: {
  status: "upcoming" | "done" | "overdue";
  task: string;
  vehicle: string;
  dueDate: string;
  dueMileage: number;
  estimatedCost: number;
}) {
  const statusConfig = {
    upcoming: {
      icon: Clock,
      bg: "bg-blue-50 border-blue-200",
      iconWrap: "bg-blue-100 text-blue-600",
      title: "text-blue-900",
      cost: "text-blue-900",
      meta: "text-blue-600",
    },
    done: {
      icon: CheckCircle2,
      bg: "bg-green-50 border-green-200",
      iconWrap: "bg-green-100 text-green-600",
      title: "text-green-900",
      cost: "text-green-900",
      meta: "text-green-600",
    },
    overdue: {
      icon: AlertCircle,
      bg: "bg-red-50 border-red-200",
      iconWrap: "bg-red-100 text-red-600",
      title: "text-red-900",
      cost: "text-red-900",
      meta: "text-red-600",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-xl border px-4 py-3.5 flex gap-3 items-start transition-all duration-200 cursor-default ${config.bg}`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${config.iconWrap}`}
      >
        <Icon size={17} />
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-between items-start gap-4 min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`text-sm font-medium leading-snug ${config.title}`}>
            {task}
          </span>
          <span className="text-xs text-muted-foreground">{vehicle}</span>
          <div className={`flex gap-3 text-xs mt-0.5 ${config.meta}`}>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {dueDate}
            </span>
            <span className="flex items-center gap-1">
              <Gauge size={11} />
              {dueMileage.toLocaleString()} km
            </span>
          </div>
        </div>

        {/* Cost */}
        <div className="shrink-0 text-right">
          <span className={`text-sm font-semibold ${config.cost}`}>
            {estimatedCost.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}
