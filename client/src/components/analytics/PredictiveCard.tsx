export function PredictiveCard({ children }: { children?: React.ReactNode }) {
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

export function PredictiveMessage({
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
