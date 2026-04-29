import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function TasksCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="col-span-1 rounded-xl border bg-card flex flex-col p-6 gap-4 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <h2 className="leading-none font-semibold">All Maintenance Tasks</h2>
      </div>

      {children ? (
        children
      ) : (
        <div className=" h-64 w-full flex items-center justify-center border-dashed border rounded-md">
          <p className="text-sm text-muted-foreground">
            No tasks available at this time.
          </p>
        </div>
      )}
    </div>
  );
}

export function TasksMessage({
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
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    done: {
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    overdue: {
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;
  return (
    <div
      className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor}`}
    >
      <div className="flex flex-row gap-4">
        <Icon size={20} className={` ${config.color}`} />
        <div className="w-full flex flex-row items-start justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="">{task}</h4>
            <p className="text-sm text-muted-foreground">{vehicle}</p>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Due: {dueDate}</span>
              <span>At: {dueMileage.toLocaleString()} km</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm text-muted-foreground">Est. Cost</p>
            <p className="font-medium">${estimatedCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SmartMessage({
  type,
  description,
}: {
  type: "blue" | "yellow" | "green" | "purple" | "red";
  description: string;
}) {
  const config = {
    blue: {
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    yellow: {
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    green: {
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    purple: {
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    red: {
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
  };

  const { bgColor, borderColor } = config[type];

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg ${bgColor} border ${borderColor}`}
    >
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
